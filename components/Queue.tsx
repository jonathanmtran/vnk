import {
  Badge,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Component } from "react";
import QueueEntry from "./QueueEntry";

type QueueProps = {
  id: string;
};

type QueueState = {
  queueId: string;
  queue: Array<any>;
  upcoming: Array<any>;
  performed: Array<any>;
};

export default class Queue extends Component<QueueProps, QueueState> {
  constructor(props: QueueProps) {
    super(props);

    this.state = {
      queueId: this.props.id,
      queue: [],
      upcoming: [],
      performed: [],
    };

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handlePerform = this.handlePerform.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (!this.props.id && !this.state.queueId) {
      return;
    }
    this.fetchData(this.props.id);
  }

  /* eslint-disable no-unused-vars */
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        queueId: this.props.id,
      });
      this.fetchData(this.props.id);
    }
  }

  fetchData(id: string) {
    if (typeof id === "undefined") return;

    fetch(`/api/queue/${id}`)
      .then((response) => response.json())
      .then((json) => {
        let upcoming = json.queue.filter((item: any) => {
          return item.performed === null;
        });

        let performed = json.queue.filter((item: any) => {
          return item.performed !== null;
        });

        this.setState({
          queue: json.queue,
          upcoming: upcoming,
          performed: performed,
        });
      });
  }

  handleRemove(id: string) {
    fetch(`/api/queue/${this.state.queueId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        let updatedQueue = this.state.queue.filter((item) => {
          return item.id !== json.id;
        });

        let updatedUpcomingQueue = this.state.upcoming.filter((item) => {
          return item.id !== json.id;
        });

        this.setState({
          queue: updatedQueue,
          upcoming: updatedUpcomingQueue,
        });
      });
  }

  handlePerform(id: string) {
    fetch(`/api/queue/${this.state.queueId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.id !== this.state.queueId) {
          console.error({ queueId: this.state.queueId, id: jsonResponse.id });
        }

        this.fetchData(this.state.queueId);
      });
  }

  render() {
    return (
      <>
        <Heading as="h3">Queue</Heading>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>
              Upcoming <Badge>{this.state.upcoming.length}</Badge>
            </Tab>
            <Tab>Performed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {this.state.upcoming.length === 0 ? "The queue is empty" : null}
              {this.state.upcoming.map((item) => (
                <QueueEntry
                  key={item.id}
                  {...item}
                  onPerform={this.handlePerform}
                  onRemove={this.handleRemove}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {this.state.performed.map((item) => (
                <QueueEntry
                  key={item.id}
                  {...item}
                  onPerform={this.handlePerform}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </>
    );
  }
}
