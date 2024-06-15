import pandas as pd
from .models import Patent

def load_patents_from_csv():
    csv_file_path = '../patents.csv'
    data = pd.read_csv(csv_file_path)
    for index, row in data.iterrows():
        Patent.objects.create(
            applicationNumber=row['Application Number'],
            publicationNumber=row['Publication number'],
            title=row['Title'],
            status=row['Status'],
            country=row['Country'],
            grantDate=row['Grant Date'],
            expirationDate=row['Expiration date'],
            sizeFamily=row['size_family'],
            numberCitations=row['number_citations'],
            score=row['score']
        )
