import {
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { IContext } from "../../context";
import Pagination from "@choc-ui/paginator";

const LoadMore = () => {
  const { type, files, meta, setPage, page } = useContext(IContext);
  const noMore = files.length === meta.total;
  return (
    <Center mt={2}>
      {noMore ? (
        <Text as="i">No more</Text>
      ) : (
        <Button
          colorScheme="gray"
          isLoading={type === "nexting"}
          onClick={() => {
            setPage({
              ...page,
              page_num: page.page_num + 1,
            });
          }}
        >
          Load More
        </Button>
      )}
    </Center>
  );
};

// TODO page2 load 2 pages
const AutoLoadMore = () => {
  const { type, files, meta, setPage, page, getSetting } = useContext(IContext);
  const noMore = files.length >= meta.total;
  const dom = useRef<HTMLDivElement>(null);
  // const loadMore = useDebounce(() => {
  //   if (type !== "nexting") {
  //     setPage({
  //       ...page,
  //       page_num: page.page_num + 1,
  //     });
  //   }
  // }, 500);
  const bindHandleScroll = () => {
    if (!dom.current) {
      return;
    }
    const viewPortHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const top =
      dom.current.getBoundingClientRect() &&
      dom.current.getBoundingClientRect().top;
    if (top <= viewPortHeight) {
      if (type !== "nexting") {
        console.log("load more");
        window.removeEventListener("scroll", bindHandleScroll);
        setPage({
          ...page,
          page_num: page.page_num + 1,
        });
      }
    }
  };
  useEffect(() => {
    // 页面滚动监听
    window.addEventListener("scroll", bindHandleScroll);
    return () => {
      // 注销页面滚动监听
      window.removeEventListener("scroll", bindHandleScroll);
    };
  }, [page, type]);
  return (
    <Center mt={2}>
      {noMore ? (
        <Text as="i">No more</Text>
      ) : (
        <Spinner
          ref={dom}
          color={getSetting("icon color") || "teal.300"}
          size="lg"
        />
      )}
    </Center>
  );
};

const Pagination_ = () => {
  const { type, files, meta, setPage, page, getSetting } = useContext(IContext);
  const size = useBreakpointValue({
    base: "xs",
    md: "sm",
  });
  return (
    <Flex mt={2} alignItems="center" w="full" justifyContent="center">
      <Pagination
        defaultCurrent={page.page_num}
        colorScheme="twitter"
        total={meta.total}
        paginationProps={{ display: "flex" }}
        pageSize={page.page_size}
        pageNeighbours={2}
        size={size}
        onChange={(page_num) => {
          setPage({
            ...page,
            page_num: page_num || 1,
          });
        }}
      />
    </Flex>
  );
};

const Bottom = () => {
  const { getSetting, meta, type } = useContext(IContext);
  const loadType = getSetting("load type");
  // console.log(loadType);
  if (type === "loading" || meta.driver === "root") {
    return null;
  }
  switch (loadType) {
    case "load more":
      return <LoadMore />;
    case "auto load more":
      return <AutoLoadMore />;
    case "pagination":
      return <Pagination_ />;
  }
  return null;
};

export default Bottom;
