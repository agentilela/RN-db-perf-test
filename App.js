/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import TestView from "./TestView";
import json from "./src/assets/ResidentialTemplate.json";

type Props = {};
export default class App extends Component<Props> {
  state = {
    asyncReadTime: undefined,
    asyncWriteTime: undefined,
    asyncState: "Not Tested",
    sqliteReadTime: undefined,
    sqliteWriteTime: undefined,
    sqliteState: "Not Tested",
    sqlite2ReadTime: undefined,
    sqlite2WriteTime: undefined,
    sqlite2State: "Not Tested"
  };

  handleTick = cb => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    cb();
    if (this.running) {
      this.timer = setTimeout(() => this.handleTick(cb), 100);
    }
  };

  handleTestWrite = (testDB, updateTime, updateState) => {
    updateState("Testing Writes...");
    const startTime = Date.now();
    this.running = true;
    this.handleTick(() => updateTime(Date.now() - startTime));
    return testDB
      .bulkDocs(json.data, { new_edits: false })
      .then(res => {
        console.log("res", res);
        this.running = false;
        return testDB.info().then(() => updateState("Complete"));
      })
      .catch(err => {
        console.log("err", err);
        this.running = false;
        return testDB.then(() => updateState("Error"));
      });
  };

  handleTestRead = (testDB, updateTime, updateState) => {
    updateState("Testing Reads...");
    const startTime = Date.now();
    this.running = true;
    this.handleTick(() => updateTime(Date.now() - startTime));
    return testDB
      .allDocs({ include_docs: true })
      .then(res => {
        console.log("res", res);
        this.running = false;
        return testDB.info().then(() => updateState("Complete"));
      })
      .catch(err => {
        console.log("err", err);
        this.running = false;
        return testDB.then(() => updateState("Error"));
      });
  };

  handleTest = (testDB, updateReadTime, updateWriteTime, updateState) =>
    this.handleTestWrite(testDB, updateWriteTime, updateState)
      .then(() => this.handleTestRead(testDB, updateReadTime, updateState))
      .then(testDB.destroy)
      .then(() => updateState("Complete"));

  handleStartSqliteTest = () => {
    const PouchDB = require("pouchdb-core");
    const SQLiteAdapterFactory = require("pouchdb-adapter-react-native-sqlite");
    const SQLite = require("react-native-sqlite-storage");
    const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
    PouchDB.plugin(SQLiteAdapter);

    const testDB = new PouchDB("db.sqlite", {
      adapter: "react-native-sqlite"
    });

    return this.handleTest(
      testDB,
      sqliteReadTime => this.setState({ sqliteReadTime }),
      sqliteWriteTime => this.setState({ sqliteWriteTime }),
      sqliteState => this.setState({ sqliteState })
    );
  };

  handleStartSqlite2Test = () => {
    const PouchDB = require("pouchdb-core");
    const SQLiteAdapterFactory = require("pouchdb-adapter-react-native-sqlite");
    const SQLite = require("react-native-sqlite-2").default;
    const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
    PouchDB.plugin(SQLiteAdapter);

    const testDB = new PouchDB("db.sqlite2", {
      adapter: "react-native-sqlite"
    });

    return this.handleTest(
      testDB,
      sqlite2ReadTime => this.setState({ sqlite2ReadTime }),
      sqlite2WriteTime => this.setState({ sqlite2WriteTime }),
      sqlite2State => this.setState({ sqlite2State })
    );
  };

  handleStartAsyncTest = () => {
    const PouchDB = require("pouchdb-core");
    const AsyncStorage = require("pouchdb-adapter-asyncstorage").default;
    PouchDB.plugin(AsyncStorage);
    const testDB = new PouchDB("db.asyncStorage", {
      adapter: "asyncstorage"
    });

    return this.handleTest(
      testDB,
      asyncReadTime => this.setState({ asyncReadTime }),
      asyncWriteTime => this.setState({ asyncWriteTime }),
      asyncState => this.setState({ asyncState })
    );
  };

  render() {
    const {
      asyncReadTime,
      asyncWriteTime,
      asyncState,
      sqliteReadTime,
      sqliteWriteTime,
      sqliteState,
      sqlite2ReadTime,
      sqlite2WriteTime,
      sqlite2State
    } = this.state;
    return (
      <View style={styles.wrapper}>
        <TestView
          readTime={asyncReadTime}
          writeTime={asyncWriteTime}
          status={asyncState}
          onPress={this.handleStartAsyncTest}
          title="Async Storage"
        />
        <TestView
          readTime={sqliteReadTime}
          writeTime={sqliteWriteTime}
          status={sqliteState}
          onPress={this.handleStartSqliteTest}
          title="SQLite"
        />
        <TestView
          readTime={sqlite2ReadTime}
          writeTime={sqlite2WriteTime}
          status={sqlite2State}
          onPress={this.handleStartSqlite2Test}
          title="SQLite 2"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  }
});
