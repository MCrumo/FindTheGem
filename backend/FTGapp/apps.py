from django.apps import AppConfig


class FtgappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'FTGapp'

    def ready(self):
        from .lodaData import load_patents_from_csv
        load_patents_from_csv()
