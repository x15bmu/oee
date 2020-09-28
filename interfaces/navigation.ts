export type NavigationItem =
  | {
      id: string;
      text: string;
      icon?: string;
      expanded: boolean;
      items: Array<NavigationItem>;
    }
  | {
      id: string;
      text: string;
      href: string;
      icon?: string;
    };

const navigation: Array<NavigationItem> = [
  {
    id: "Monitor",
    text: "Monitor",
    expanded: false,
    items: [
      {
        id: "Monitor/OEEAnalysis",
        text: "OEE Analysis",
        icon: "fa fa-eye",
        href: "OEEAnalysis",
      },
      {
        id: "Monitor/JPHAnalysis",
        text: "JPH Analysis",
        icon: "fa fa-tachometer",
        href: "JPHAnalysis",
      },
    ],
  },
];

export default navigation;
