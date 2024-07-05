export interface AccountDetails{
  accountId:string;
  balance :number,
  currentPage: number;
  totalPages:number;
  pageSize:number;
  //meme nom (fichier JSON)
  accountOperationDTOList:AccountOperation[];
}
export interface AccountOperation{
  id:number;
  operationDate:Date;
  amount:number,
  type:string;
  description:string;
}
