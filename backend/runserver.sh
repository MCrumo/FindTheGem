
# Cada cop que modifiqui el models.py de Patents (per adaptar la DB a aquest nou objecte)
python3 ./manage.py makemigrations
python3 ./manage.py migrate

python3 manage.py runserver


# python3 ./manage.py createsuperuser
# 127.0.0.1/8000/admin