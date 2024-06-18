export default class Patent {
  applicationNumber: string | null | undefined;
  publicationNumber: string | null | undefined;
  title: string | null | undefined;
  status: string | null | undefined;
  country: string | null | undefined;
  grantDate: string | null | undefined;
  expirationDate: string | null | undefined;
  sizeFamily: number | null | undefined;
  numberCitations: number | null | undefined;
  score: number | null | undefined;


  constructor(data: Partial<Patent>) {
    this.applicationNumber = data.applicationNumber;
    this.publicationNumber = data.publicationNumber;
    this.title = data.title;
    this.status = data.status;
    this.country = data.country;
    this.grantDate = data.grantDate;
    this.expirationDate = data.expirationDate;
    this.sizeFamily = data.sizeFamily;
    this.numberCitations = data.numberCitations;
    this.score = data.score;
  }
}