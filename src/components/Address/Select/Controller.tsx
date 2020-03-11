import React from "react";

import { User } from "resources/user";
import { Address, loadAllAddresses, createAddress, NEW_ADDRESS_ID, deleteAddress } from "resources/address";
import View from "./View";

interface Props {
  onAddressIdChange: (id: Address["id"]) => void;
  phone: User["phone"];
  token: User["token"];
}

interface State {
  done: boolean;
  selected?: number;
  newAddress: Address;
  addresses: Address[];
  createAddressError?: Error;
}

class AddressSelectController extends React.Component<Props> {
  state: State = {
    done: false,
    addresses: [],
    newAddress: {},
  };
  async loadAddresses() {
    const addresses = await loadAllAddresses(this.props.token)
    this.setState({ addresses });
    if (!this.state.selected) {
      if (addresses.length > 0) this.setState({ selected: addresses[0].id })
      else this.setState({ selected: NEW_ADDRESS_ID });
    }
  }
  async componentDidMount() {
    await this.loadAddresses();
  }
  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const selected = Number(event.currentTarget.value);
    this.setState({ selected });
  }
  onNewAddressChange = (newAddress: Address) => {
    this.setState({ newAddress });
  }
  submitAddress = async () => {
    const { selected, newAddress } = this.state;
    if (selected === NEW_ADDRESS_ID) {
      try {
        const address = await createAddress(this.props.token, {
          phone: this.props.phone,
          street: newAddress.street as string,
          ward_id: newAddress.wardId as number,
          recipient: newAddress.recipient as string,
          description: "",
        });
        const addresses = await loadAllAddresses(this.props.token)
        this.setState({
          addresses,
          selected: address.id,
        });
      } catch (createAddressError) {
        this.setState({ createAddressError });
        return;
      }
    }
    this.setState({ done: true });
    this.props.onAddressIdChange(this.state.selected);
  }
  onDeleteAddress = async (id: Address["id"]) => {
    if (this.state.selected === id) {
      this.setState({ selected: undefined });
    }
    await deleteAddress(this.props.token, id as number);
    await this.loadAddresses();
  }
  onUndone = () => {
    this.setState({ done: false });
    this.props.onAddressIdChange(undefined);
  }
  render() {
    return <View
      onDeleteAddress={this.onDeleteAddress}
      selected={this.state.selected}
      addresses={this.state.addresses}


      done={this.state.done}
      onUndone={this.onUndone}

      onChange={this.onChange}
      onNewAddressChange={this.onNewAddressChange}
      submitAddress={this.submitAddress}
      createAddressError={this.state.createAddressError}
    />;
  }
}

export default AddressSelectController;
