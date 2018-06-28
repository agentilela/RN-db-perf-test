/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export default class TestView extends PureComponent<Props> {
  render() {
    const { readTime, writeTime, status, onPress, title } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{title}</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonLabel}>Test</Text>
          </TouchableOpacity>
          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>{status}</Text>
            <View style={styles.resultTimingWrapper}>
              {writeTime !== undefined ? (
                <View style={styles.resultTimingContainer}>
                  <Text style={[styles.resultType, { color: "#3D9970" }]}>
                    Write
                  </Text>
                  <Text style={styles.resultContent}>{writeTime}ms</Text>
                </View>
              ) : null}
              {readTime !== undefined ? (
                <View style={styles.resultTimingContainer}>
                  <Text style={[styles.resultType, { color: "#B10DC9" }]}>
                    Read
                  </Text>
                  <Text style={styles.resultContent}>{readTime}ms</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 0,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginRight: 16,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0074D9"
  },
  buttonLabel: {
    flex: 0,
    color: "#FFF",
    fontSize: 16
  },
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row"
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#333"
  },
  headerContainer: {
    flex: 0,
    paddingBottom: 16,
    backgroundColor: "#F5FCFF"
  },
  header: {
    flex: 0,
    color: "#333",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "300"
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: "#333"
  },
  resultTimingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  resultTimingWrapper: {
    flex: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "row",
    paddingVertical: 16
  },
  resultHeader: {
    flex: 0,
    color: "#333",
    fontSize: 20,
    fontWeight: "400"
  },
  resultType: {
    flex: 0,
    color: "#333",
    fontSize: 18,
    fontWeight: "300"
  },
  resultContent: {
    flex: 0,
    color: "#333",
    fontSize: 14,
    paddingTop: 3,
    fontWeight: "300"
  }
});
