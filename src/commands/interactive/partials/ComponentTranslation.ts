class ComponentTranslation {
  constructor(private readonly componentName: string) {}

  public renderContent() {
    return `{
  "translation": "translation"
}
`;
  }
}

export default ComponentTranslation;
