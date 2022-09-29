use async_std::sync::Mutex;
use core::hash::Hash;
use ratelimit_rs::Bucket;
use std::{
    collections::HashMap,
    time::{Duration, Instant},
};

pub struct Limiter<T> {
    limiters: Mutex<HashMap<T, (Bucket, Instant)>>,
    cap: u32,
    interval: Duration,
}

impl<T> Limiter<T>
where
    T: Hash + Eq + Clone,
{
    pub fn new(cap: u32, interval: Duration) -> Self {
        Limiter {
            limiters: Mutex::new(HashMap::new()),
            cap,
            interval,
        }
    }

    pub async fn take(&self, key: T) -> bool {
        let mut limiters = self.limiters.lock().await;

        if let Some((limiter, created)) = limiters.get_mut(&key) {
            if !self.is_expired(created) {
                *created = Instant::now();
                return limiter.take_one_available() == 1;
            }
        }

        let mut limiter = Bucket::new(self.interval, self.cap.into(), 1, self.cap.into());

        let ok = limiter.take_one_available() == 1;
        limiters.insert(key, (limiter, Instant::now()));

        ok
    }

    pub async fn cleanup(&self) -> usize {
        let mut limiters = self.limiters.lock().await;
        let keys = limiters
            .iter()
            .filter(|(_, (_, created))| !self.is_expired(created))
            .map(|(key, _)| key.clone())
            .collect::<Vec<T>>();
        for k in &keys {
            limiters.remove(k);
        }
        keys.len()
    }

    fn is_expired(&self, created: &Instant) -> bool {
        created.elapsed() > self.interval * self.cap
    }
}
