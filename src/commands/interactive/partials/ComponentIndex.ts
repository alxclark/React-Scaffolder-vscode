class ComponentIndex {
  constructor(
    private readonly componentName: string,
  ) {}

  public renderContent(){
    return `import ${this.componentName} from './${this.componentName}';

export default ${this.componentName};
`
  }
}

export default ComponentIndex;
