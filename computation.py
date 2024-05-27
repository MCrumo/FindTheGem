import pandas as pd
import numpy as np
import datetime as dt
import math 

def status_priority(status):
    low_priority = ['Withdrawn', 'Abandoned', 'Refused', 'NA']
    medium_priority = ['Expired', 'expired', 'Filed', 'Inactive']
    high_priority = ['Granted', 'Sold', 'Validated', 'Nationalized', 'Active']
    status_split = status.split('-')

    count = 0
    # print(status_split)
    for status in status_split:
        if status in low_priority:
            count += 1
        elif status in medium_priority:
            count += 2
        elif status in high_priority:
            count += 3
        else: count += 0
    return count / len(status_split) / 3
    
def statuss_priority(status):
    priority = []
    for s in status:
        priority.append(status_priority(s))
    return priority

def years_priority(dates, actual_year):
    priority = []
    for date in dates:
        # print(date)
        if isinstance(date, float) and math.isnan(date):
            priority.append(0)
            continue

        if not '/' in date[:4]: year = int(date[:4])
        else: year = int(date[-4:])

        rang_year = actual_year - 6
        
        if year - rang_year < 0: 
            priority.append(0)
        elif year - rang_year > 6:
            priority.append(1)
        else: 
            priority.append((year - rang_year) / 6)
    return priority

def citations_priority(citations):
    max_citacion = max(citations)
    min_citacion = min(citations)
    priority = []
    for citation in citations:
        priority.append((citation - min_citacion) / (max_citacion - min_citacion))
    return priority

def size_family_priority(size_family):
    max_family = max(size_family)
    min_family = min(size_family)
    priority = []
    for size in size_family:
        priority.append((size - min_family) / (max_family - min_family))
    return priority

if __name__ == '__main__':
    actual_year = dt.datetime.now().year
    
    # Load dataset
    patents = pd.read_csv('patents.csv')
    aux = patents['Expiration date'].values.tolist()
    years_pri = years_priority(aux, actual_year)
    status_pri = statuss_priority(patents['Status'])
    citations_pri = citations_priority(patents['number_citations'])
    family_pri = size_family_priority(patents['size_family'])
    
    score = []
    # Merge priorities
    for i in range(len(patents)):
        score_computed = (years_pri[i] + status_pri[i] + citations_pri[i] + family_pri[i])/4*5
        score.append(score_computed)
    patents['score'] = score

    # Save dataset
    path = 'patents.csv'
    patents.to_csv(path, index=False)