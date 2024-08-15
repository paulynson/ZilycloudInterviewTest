declare module "react-slick" {
  import { Component } from "react";

  interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    responsive?: Array<{ breakpoint: number; settings: Settings }>;
    // Add other settings as needed
  }

  export default class Slider extends Component<Settings> {}
}
