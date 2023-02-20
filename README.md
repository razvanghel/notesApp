### How to run backend

1. Run `djbackend/install_venv.bat` in order to install the virtual environment
    Manual Alternative:
    - `cd djbackend`
    - `virtualenv venv`
    - `call venv/scripts/activate`
    - `pip install -r requirements.txt`

2. Create a local postgres database. Enter the credentials in `djbackend/database_creds.py`
3. Run `djbackend/migrate_database.bat`
    Manual Alternative:
    `call venv/scripts/activate`
    `python manage.py makemigrations`
    `python manage.py migrate`
    Documentation about django migrations: 
    https://docs.djangoproject.com/en/4.1/topics/migrations/

4. Run `djbackend/run_server.bat` in order to start the server
    Manual Alternative:
    - `cd djbackend`
    - `call venv/scripts/activate`
    - `python manage.py runserver`


### How to turn on react server
Run :
- `cd frontendreact`
- `npm start`


### How to test the app
1. Install chromedriver.exe for your Chrome version and add the path of chromedriver.exe to environment variables
2. run the test files from 'djbackend/test'
