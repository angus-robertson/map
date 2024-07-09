from datetime import datetime
from loguru import logger

def main():
    start_time = datetime.now()
    
    # Load data from 


    # Load into DuckDB
    conn = duckdb.connect()
    create_table_from_dataframe(
        duckdb_con=conn,
        table_name='test',
        table_ddl=
    )

    # Save data locally
    logger.info(f"Sinking data to {params.destination}")


    end_time = datetime.now()
    elapsed = (end_time - start_time).total_seconds()
    logger.info(f"Job complete in {elapsed // 60} minutes and {elapsed % 60:.2f} seconds.")

def create_table_from_dataframe(duckdb_con, table_name: str, table_ddl: str):
    logger.info(f"Creating table {table_name} in local DuckDB")
    duckdb_con.sql(table_ddl)
    logger.info("Inserting data into table")
    duckdb_con.sql(
        f"""
        INSERT INTO {table_name}
            SELECT *
            FROM pa_tbl
        """
    )


if __name__ == "__main__":
    main() 