FROM rust:slim AS build
WORKDIR /build
COPY server/src src
COPY server/Cargo.lock .
COPY server/Cargo.toml .
RUN cargo build --release

FROM debian:11-slim AS release
COPY --from=build /build/target/release/duesgoerd-server /bin/duesgoerd-server
COPY scripts/entrypoint.sh /bin/entrypoint.sh
RUN chmod +x /bin/entrypoint.sh
ENV DG_BINDADDRESS="0.0.0.0:80"
ENV DG_ALLOWEDORIGINS="*"
ENV RUST_LOG="info"
EXPOSE 80
ENTRYPOINT [ "/bin/entrypoint.sh" ]