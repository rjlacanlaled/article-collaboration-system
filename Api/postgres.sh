#!/bin/bash
docker run -d \
	--name acs2-postgres \
	-e POSTGRES_PASSWORD=test1234 \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v 1_data:/var/lib/postgresql/data \
    -p 5433 \
	postgres