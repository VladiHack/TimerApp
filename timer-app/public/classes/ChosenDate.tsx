

export class ChosenDate
{
  public date: string;
  private timeMidnight='00:00:00';

  constructor(date: string)
  {
    this.date=date;
  }

  getDate(): Date 
  {
      return new Date(`${this.date}T${this.timeMidnight}`);
  }
}