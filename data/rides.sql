LOAD spatial;
LOAD parquet;
LOAD httpfs;

CREATE TABLE rides AS SELECT * FROM 'https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2024-04.parquet';

CREATE TABLE cleaned_rides AS SELECT 
    ST_POINT(pickup_latitude, pickup_longitude) as pickup_point,
    ST_POINT(dropoff_latitude, dropoff_longitude) as dropoff_point,
    dropoff_datetime::TIMESTAMP - pickup_datetime::TIMESTAMP as time,
    trip_distance,
    st_distance(
        st_transform(pickup_point, 'EPSG:4326', 'ESRI:102718'), 
        st_transform(dropoff_point, 'EPSG:4326', 'ESRI:102718')
    ) / 5280 as aerial_distance,
    trip_distance - aerial_distance as diff,
FROM rides WHERE diff > 0 ORDER BY diff DESC;