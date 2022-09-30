#!/bin/sh

ADDR=$DG_BINDADDRESS

[ ! -z $PORT ] && ADDR="0.0.0.0:$PORT"

export DG_BINDADDRESS=$ADDR

echo "Starting on address $ADDR"
/bin/duesgoerd-server