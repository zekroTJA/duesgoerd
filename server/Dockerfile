FROM rust:slim AS build
WORKDIR /build
COPY src src
COPY Cargo.lock .
COPY Cargo.toml .
RUN cargo build --release

FROM debian:11-slim AS release
COPY --from=build /build/target/release/duesgoerd-server /bin/duesgoerd-server
ENV DG_BINDADDRESS="0.0.0.0:80"
ENV DG_ALLOWEDORIGINS="*"
EXPOSE 80
ENTRYPOINT [ "/bin/duesgoerd-server" ]