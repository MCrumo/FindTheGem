import pandas as pd
import numpy as np
from google_patent_scraper import scraper_class
import json
import math
import re
from bs4 import BeautifulSoup

def findPatentCitationsAndSizeFamily(patents):
    scraper = scraper_class()
    
    for i in range(patents.shape[0]):
        patent = patents['Publication number'][i]
        scraper.add_patents(str(patent))

    scraper.scrape_all_patents()
    size_family = []
    number_citations = []
    for i in range(patents.shape[0]):
        patent = patents['Publication number'][i]
        if isinstance(patent, float) and math.isnan(patent):
            size_family.append(0)
            number_citations.append(0)
        else:
            patent_scrape = scraper.parsed_patents[patent]
            if len(patent_scrape) > 0 :
                citation2 = json.loads(patent_scrape['backward_cite_no_family'])
                citation4 = json.loads(patent_scrape['backward_cite_yes_family'])
                # print(len(citation1), len(citation2), len(citation3), len(citation4))
                number_citations.append(len(citation2)  + len(citation4))
                size_family.append(len(citation4))
            else:
                size_family.append(0)
                number_citations.append(0)
    
    return size_family, number_citations

def getAttachNumber(publication_number, application_number):
    try:
        pn_final = ''.join(re.split(r'/|-', publication_number))
        pn_final = pn_final.split('.')[0]
    except:
        pn_final = publication_number

    try:
        an_final = ''.join(re.split(r'/|-', application_number))
        an_final = an_final.split('.')[0]
    except:
        an_final = application_number
            
    return pn_final, an_final
    
        
if __name__ == "__main__":
    
    df = pd.DataFrame(pd.read_excel('Llistat-patents-Fractus_estudiants_v2.xlsx'))
    patents = df[['Application Number', 'Publication number', 'Title', 'Status', 'Country', 'Grant Date', 'Expiration date']]
    number_pantents = patents.shape[0]

    for i in range(number_pantents):
        publication_number = patents['Publication number'][i]
        application_number = patents['Application Number'][i]
        pn_final, an_final = getAttachNumber(publication_number, application_number)
        patents['Publication number'][i] = pn_final
        patents['Application Number'][i] = an_final

    size_family, number_citations = findPatentCitationsAndSizeFamily(patents)
    # print(size_family, number_citations)
    patents['size_family'] = size_family
    patents['number_citations'] = number_citations
    path = 'patents.csv'
    patents.to_csv(path, index=False)