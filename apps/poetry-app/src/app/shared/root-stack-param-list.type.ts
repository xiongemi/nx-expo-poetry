import { AppRoutes } from './app-routes.enum';

export type RootStackParamList = {
  [AppRoutes.Search]: { search?: string };
  [AppRoutes.Bookmarks]: undefined;
  [AppRoutes.PoemOfTheDay]: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
