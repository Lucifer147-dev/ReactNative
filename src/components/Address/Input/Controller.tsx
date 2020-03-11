import React from "react";
import { Address, AddressPart, loadAddressSuggestion } from "resources/address";
import View from "./View";

interface AddressInputControllerProps {
  token: string;
  onAddressChange: (address: Address) => void;
  error?: Error;
}

interface AddressInputControllerState {
  address: Address;
  wards?: AddressPart[],
  provinces?: AddressPart[],
  districts?: AddressPart[],
}

class AddressInputController extends React.Component<AddressInputControllerProps, AddressInputControllerState> {
  state: AddressInputControllerState = {
    address: { provinceId: 79 },
  };
  async componentDidMount() {
    const { provinces } = await loadAddressSuggestion(this.props.token, {});
    this.setState({ provinces });

    const { districts } = await loadAddressSuggestion(this.props.token, { provinceId: this.state.address.provinceId });
    this.setState({ districts });
  }
  async componentDidUpdate(_: {}, previousState: AddressInputControllerState) {
    const { provinceId, districtId } = this.state.address;
    if (previousState.address.provinceId !== provinceId) {
      const { districts } = await loadAddressSuggestion(this.props.token, { provinceId });
      this.setAddress({ wardId: 0, districtId: 0 });
      this.setState({ districts });
    } else if (districtId && previousState.address.districtId !== districtId) {
      const { wards } = await loadAddressSuggestion(this.props.token, { provinceId, districtId });
      this.setAddress({ wardId: 0 });
      this.setState({ wards });
    }
  }
  setAddress = (newAddress: Address) => {
    const address = { ...this.state.address, ...newAddress };
    this.setState({ address });
    this.props.onAddressChange(address);
  };
  setWard: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const wardId = Number(event.target.value);
    this.setAddress({ wardId });
  };
  setDistrict: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const districtId = Number(event.target.value);
    const { provinceId } = this.state.address;
    this.setAddress({ provinceId, districtId });
  }
  setProvince: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const provinceId = Number(event.target.value);
    this.setAddress({ provinceId, districtId: undefined, wardId: undefined });
  }
  setStreet: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    this.setAddress({ street: event.target.value });
  }
  render() {
    return <View
      {...this.state}
      error={this.props.error}
      setWard={this.setWard}
      setDistrict={this.setDistrict}
      setProvince={this.setProvince}
      setStreet={this.setStreet}
    />
  }
}

export default AddressInputController;
