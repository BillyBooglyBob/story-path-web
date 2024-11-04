import {
  SCORING_OPTIONS,
  HOMESCREEN_DISPLAY_OPTIONS,
  LOCATION_TRIGGER_OPTIONS,
} from "./constants";

type Scoring = (typeof SCORING_OPTIONS)[keyof typeof SCORING_OPTIONS];

type HomeScreenDisplay =
  (typeof HOMESCREEN_DISPLAY_OPTIONS)[keyof typeof HOMESCREEN_DISPLAY_OPTIONS];

export type Project = {
  id?: number;
  title: string;
  description: string;
  is_published: boolean;
  participant_scoring: Scoring;
  instructions: string;
  initial_clue?: string;
  homescreen_display: HomeScreenDisplay;
  username?: string;
};

export type Projects = Project[];

export type ApiOptions = {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
    Prefer?: string;
  };
  body?: string;
};

type LocationTriggers =
  (typeof LOCATION_TRIGGER_OPTIONS)[keyof typeof LOCATION_TRIGGER_OPTIONS];

export type ProjectLocation = {
  location_name: string;
  location_trigger: LocationTriggers;
  location_position: string;
  score_points: number;
  clue?: string;
  location_content: string;
  username: string;
  project_id: number;
  id?: number;
  location_order?: number;
  extra?: string
};
