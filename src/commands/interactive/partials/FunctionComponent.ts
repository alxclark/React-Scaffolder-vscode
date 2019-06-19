
export interface FunctionComponentOptions {
  hasTranslations?: boolean;
  hasGraphQLQuery?: boolean;
  hasStyles?: boolean;
}

export class FunctionComponent { 
  constructor(private readonly componentName: string, private readonly options: FunctionComponentOptions = {}) {}

  private renderImports() {
    const {hasGraphQLQuery, hasTranslations, hasStyles} = this.options;
    let imports = "import React from 'react';\n";
    
    if(hasTranslations) {
      imports += "import {useI18n} from '@shopify/react-i18n';\n";
    }

    if(hasGraphQLQuery) {
      imports += "import {useQuery} from '@shopify/react-graphql';\n";
      imports += `import ${this.componentName}Query from '../../graphql/${this.componentName}Query.graphql';\n`;
    }

    if(hasStyles) {
      imports += `import * as styles from './${this.componentName}.scss';\n`;
    }
    
    return imports;
  }

  private renderHooks() {
    const {hasGraphQLQuery, hasTranslations} = this.options;
    let hooks = '';

    if(hasTranslations) {
      hooks += "  const [i18n] = useI18n();\n";
    }
    
    if(hasGraphQLQuery) {
      hooks += `  const {data, error, loading} = useQuery(${this.componentName}Query);\n`;
    }
     
    return hooks;
  }

  public renderContent() {
    return `${this.renderImports()}
export interface Props {}

function ${this.componentName}({}: Props) {
${this.renderHooks()}
  return (
    <div>
      <p>${this.componentName}</p>
    </div>
  )
}

export default ${this.componentName};
`
  }
}