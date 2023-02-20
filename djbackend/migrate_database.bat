@echo off
call venv/scripts/activate
python manage.py makemigrations
python manage.py migrate --fake-initial
python initial_data.py
pause