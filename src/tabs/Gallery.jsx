import { MagnifyingGlass } from "react-loader-spinner";
import { useState, useEffect } from "react";
import * as ImageService from "service/image-service";
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from "components";

export const Gallery = () => {
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total_results, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchValue) return;
    onRequest(searchValue, page);

    // eslint-disable-next-line
  }, [searchValue, page]);

  async function onRequest(query, page) {
    setLoading(true);
    try {
      const {
        data: { photos, total_results },
      } = await ImageService.getImages(query, page);
      if (!images) {
        setLoading(false);
        setImages([...photos]);
      }

      setImages((prevImage) => [...prevImage, ...photos]);
      setTotal(total_results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  const handlSubmit = (query) => {
    setSearchValue(query);
    setImages([]);
    setPage(1);
    setError(false);
  };

  const handlClickLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <SearchForm onSubmit={handlSubmit} />

      <Grid>
        {images &&
          images.map(({ alt, avg_color, id, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
      </Grid>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="MagnifyingGlass-loading"
          />
        </div>
      )}
      {images &&
        images.length !== 0 &&
        images.length !== total_results &&
        !loading && <Button onClick={handlClickLoadMore}>Load more</Button>}
      {error && <Text textAlign="center">Sorry. {error} ... 😭</Text>}
      {total_results === 0 && (
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      )}
    </>
  );
};
