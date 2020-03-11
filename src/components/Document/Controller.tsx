import React from "react";
import { getDocument } from "resources/document";

import View from './View';
import { match } from "react-router";

interface Props {
  match: match<{slug: string}>;
}

interface State {
  document?: string;
}

class Document extends React.Component<Props> {
  state: State = {}
  async componentDidMount() {
    const slug = this.props.match.params.slug;
    const document = await getDocument(slug);
    this.setState({ document });
  }
  render() {
    return <View document={this.state.document}/>
  }
}

export default Document;
