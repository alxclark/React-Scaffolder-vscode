class ComponentQuery {
  constructor(
    private readonly componentName: string,
  ) {}
  
  public renderContent(){
    return `query ${this.componentName} {
  shop {
    id
  }
}
      `
    }
}
  
export default ComponentQuery;
  