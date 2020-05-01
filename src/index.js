import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Picker } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";

class TimePicker extends Component {
  constructor(props) {
    super(props);
    const { selectedHour, selectedMinute } = props;
    this.state = { selectedHour, selectedMinute, selectedMinuteDisplay: selectedMinute };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedHour, selectedMinute } = nextProps;
    if (
      selectedHour !== this.state.selectedHour ||
      parseInt(selectedMinute) !== parseInt(this.state.selectedMinute)
    ) {
      this.setState({ selectedHour, selectedMinute: parseInt(selectedMinute) , selectedMinuteDisplay: selectedMinute });
    }
  }

  getHourItems = () => {
    const items = [];
    const { maxHour, hourInterval, hourUnit } = this.props;
    const interval = maxHour / hourInterval;
    for (let i = 0; i <= interval; i++) {
      const value = `${i * hourInterval}`;
      const item = (
        <Picker.Item key={value} value={value} label={value + hourUnit} />
      );
      items.push(item);
    }
    return items;
  };

  getMinuteItems = () => {
    const items = [];
    const { maxMinute, minuteInterval, minuteUnit } = this.props;
    const interval = maxMinute / minuteInterval;
    for (let i = 0; i <= maxMinute; i++) {
      const value = i * minuteInterval;
      const new_value_label = value < 10  ? `0${value}` : `${value}`;
      const item = (
        <Picker.Item
          key={-value}
          value={value !== 0 ? `${-value}` : `120`}
          label={new_value_label + minuteUnit}
        />
      );
      items.push(item);
    }
    for (let i = 0; i <= interval; i++) {
      const value = i * minuteInterval;
      const new_value = value < 10 ? `0${value}` : `${value}`;
      const item = (
        <Picker.Item
          key={value}
          value={new_value}
          label={new_value + minuteUnit}
        />
      );
      items.push(item);
    }
    for (let i = 0; i <= interval; i++) {
      const value = i * minuteInterval;
      const new_value_label = value < 10  ? `0${value}` : `${value}`;
      const item = (
        <Picker.Item
          key={value + 60}
          value={`${value + 60}`}
          label={new_value_label + minuteUnit}
        />
      );
      items.push(item);
    }
    return items;
  };

  onValueChange = (selectedHour, selectedMinute, selectedMinuteDisplay) => {
    var newMin = typeof selectedMinute === "string" ? Math.abs(parseInt(selectedMinute) % 60) : Math.abs(selectedMinute % 60);
    newMin = newMin < 10 ? `0${newMin}` : `${newMin}`;
    this.setState({ selectedHour, selectedMinute, selectedMinuteDisplay: newMin});
  };

  onCancel = () => {
    if (typeof this.props.onCancel === "function") {
      const { selectedHour, selectedMinute } = this.state;
      this.props.onCancel(selectedHour, selectedMinute);
    }
  };

  onConfirm = () => {
    if (typeof this.props.onConfirm === "function") {
      const { selectedHour, selectedMinute, selectedMinuteDisplay } = this.state;
      this.props.onConfirm(selectedHour, selectedMinuteDisplay);
    }
  };

  close = () => {
    this.RBSheet.close();
  };

  open = () => {
    this.RBSheet.open();
  };

  renderHeader = () => {
    const { textCancel, textConfirm } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={this.onCancel} style={styles.buttonAction}>
          <Text style={[styles.buttonText, styles.buttonTextCancel]}>
            {textCancel}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onConfirm} style={styles.buttonAction}>
          <Text style={styles.buttonText}>{textConfirm}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderBody = () => {
    var { selectedHour, selectedMinute, selectedMinuteDisplay } = this.state;
    selectedMinute = parseInt(selectedMinute)
    selectedMinute = isNaN(selectedMinute) ? "00" : (selectedMinute < 10 && selectedMinute > -1) ? "0" + selectedMinute.toString() : selectedMinute.toString();
    return (
      <View style={styles.body}>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          itemStyle={this.props.itemStyle}
          onValueChange={itemValue =>
            this.onValueChange(itemValue, selectedMinute, selectedMinuteDisplay)
          }
        >
          {this.getHourItems()}
        </Picker>
        <Text style={styles.separator}>:</Text>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          itemStyle={this.props.itemStyle}
          onValueChange={itemValue =>
            this.onValueChange(selectedHour, itemValue, itemValue)
          }
        >
          {this.getMinuteItems()}
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.RBSheet = ref;
        }}
      >
        {this.renderHeader()}
        {this.renderBody()}
      </RBSheet>
    );
  }
}

TimePicker.propTypes = {
  maxHour: PropTypes.number,
  maxMinute: PropTypes.number,
  hourInterval: PropTypes.number,
  minuteInterval: PropTypes.number,
  hourUnit: PropTypes.string,
  minuteUnit: PropTypes.string,
  selectedHour: PropTypes.string,
  selectedMinute: PropTypes.string,
  itemStyle: PropTypes.object,
  textCancel: PropTypes.string,
  textConfirm: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

TimePicker.defaultProps = {
  maxHour: 23,
  maxMinute: 59,
  hourInterval: 1,
  minuteInterval: 1,
  hourUnit: "",
  minuteUnit: "",
  selectedHour: "0",
  selectedMinute: "00",
  itemStyle: {},
  textCancel: "Cancel",
  textConfirm: "Done"
};

export default TimePicker;
