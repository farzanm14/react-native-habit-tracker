import MyButton from "@/components/base/Button";
import MyText from "@/components/base/Text";
import R from "@/constants";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";

interface ListProps extends FlatListProps<any> {
  horizontal?: boolean;
  isLoading?: boolean;
  paginationLoading?: boolean;
  showMoreButton?: boolean;
  onPressMore?: () => void;
  emptyListMessage?: string;
  emptyListMessageStyle?: StyleProp<TextStyle>;
  onEndReachedThreshold?: number;
  infiniteScroll?: boolean;
}
export default function List({
  horizontal,
  isLoading,
  showMoreButton = false,
  onPressMore = () => {},
  paginationLoading,
  emptyListMessage = "no data found",
  emptyListMessageStyle,
  onEndReachedThreshold = 0.1,
  infiniteScroll = true,
  ...rest
}: ListProps) {
  const renderFooter = () => {
    return !showMoreButton && !isLoading ? null : (
      <View style={styles.footer}>
        <MyButton
          style={styles.showMoreBtn}
          onPress={onPressMore}
          title="load more"
        />
        {paginationLoading ? (
          <ActivityIndicator style={{ marginLeft: 8 }} />
        ) : null}
      </View>
    );
  };

  const renderEmptyMode = () => {
    return (
      <View style={styles.emptyListTextContainer}>
        <MyText
          variant="subtitle"
          style={[
            styles.emptyListText,
            rest?.inverted && styles.invertedText,
            emptyListMessageStyle,
          ]}
        >
          {emptyListMessage}
        </MyText>
      </View>
    );
  };

  return (
    <View>
      {rest.data?.length === 0 && isLoading ? (
        <ActivityIndicator style={{ marginTop: R.dimensions.v16 }} />
      ) : (
        <FlatList
          inverted={rest.data?.length === 0 ? false : horizontal}
          horizontal={horizontal}
          keyExtractor={({ item, index }) => index?.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyMode}
          onEndReached={() => {
            if (infiniteScroll && !isLoading && showMoreButton)
              onPressMore && onPressMore();
          }}
          onEndReachedThreshold={onEndReachedThreshold}
          {...rest}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: R.dimensions.v10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: R.dimensions.inputHeight55,
  },
  loadMoreBtn: {
    padding: R.dimensions.v10,
    borderRadius: R.dimensions.radius5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
  },
  emptyListTextContainer: {
    width: "100%",
    justifyContent: "center",
  },
  invertedText: {
    transform: [{ scaleX: -1 }],
    marginRight: R.dimensions.h14,
  },
  showMoreBtn: {
    borderWidth: 0,
  },
});
