from database_creds import *
import psycopg2

INSERT_QUERY = '''
INSERT INTO public.api_taskproject(
	name)
	VALUES ('Inbox');
'''

SELECT_QUERY = '''
SELECT name
	FROM public.api_taskproject
	WHERE name = 'Inbox';
'''

def connectToDb():
    conn = None
    cur = None
    try:
        conn = psycopg2.connect(database=DB_NAME,
                            user=USER,
                            password=PASSWORD,
                            host=HOST,
                            port=PORT)
        cur = conn.cursor() 
        print("Database connected successfully")
    except:
        print("Database not connected successfully")
    return conn, cur   

def addToDb():
    conn, cur = connectToDb()
    cur.execute(SELECT_QUERY)
    if len(cur.fetchall()) == 0:
        cur.execute(INSERT_QUERY)
        conn.commit()
    conn.close()
    print("Initial project inserted successfully.")

if __name__ == '__main__':
    addToDb()
