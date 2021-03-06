/**
 * Copyright 2020 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import {ApiService} from '../api-service';
import {Calendar} from './Calendar';
import {EventSourceInput} from '@fullcalendar/core/structs/event-source';
import {Header} from './Header';
import {getEvents} from '../models/release-event';

interface AppState {
  events: EventSourceInput[];
}

export class App extends React.Component<{}, AppState> {
  private apiService: ApiService;

  constructor(props: unknown) {
    super(props);
    this.state = {
      events: [],
    };
    this.apiService = new ApiService();
  }

  async componentDidMount(): Promise<void> {
    const releases = await this.apiService.getReleases();
    const events = getEvents(releases);
    this.setState({events});
  }

  render(): JSX.Element {
    return (
      <div>
        <Header title='AMP Release Calendar' />
        <div>
          <Calendar events={this.state.events} />
        </div>
      </div>
    );
  }
}
