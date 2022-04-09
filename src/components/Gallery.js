import React, { useEffect, useState } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

const Gallery = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState(false);
  const [pagItemData, setPagItemData] = useState([]);
  const [pagCount, setPagCount] = useState(1);

  const makePagination = (imageData) => {
    // Make pagination
    // If data 10 then
    // Every limit (6) images will be in one page
    // Every mod index+1 mod 6 == 0 then page will be incremented
    // console.log(imageData.length);

    let page = 0;
    let pagItem = [];
    imageData?.forEach((val, index) => {
      if (index % props.limit === 0) {
        // Incremented page count
        setPagCount(pagCount + 1);
        page += 1;
      }

      // Find page element and fill into it
      // console.log('Page now:' + page);
      // console.log(pagItem);
      const pageNowItem = pagItem.findIndex((val) => val.page === page);
      // console.log('finding page on index :' + pageNowItem);
      if (pageNowItem !== -1) {
        pagItem[pageNowItem].item.push(val);
      } else {
        // If not create new element
        pagItem.push({
          page: page,
          item: [val],
        });
      }
    });
    setPagCount(page);
    setPagItemData(pagItem);
  };

  const handlePageChange = (page) => {
    const selectedPagedImages = pagItemData.find((val) => val.page === page);
    // console.log(selectedPagedImages);
    setItemData(selectedPagedImages?.item);
  };

  useEffect(() => {
    setIsLoading(props.imageData.isLoading);
    // console.log(props.imageData.payload);

    if (
      props.imageData.payload !== false &&
      props.imageData.payload?.data?.images?.length > 0
    ) {
      makePagination(props.imageData.payload.data.images);
    }
  }, [props.imageData]);

  useEffect(() => {
    // Set item data to current page by default page = 1
    handlePageChange(1);
  }, [pagCount, pagItemData]);

  return (
    <center>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: '50px' }} />
      ) : itemData ? (
        <ImageList
          sx={{
            maxWidth: { xs: 'auto', sm: '450px', md: '500px' },
            height: 450,
          }}
          cols={3}
          rowHeight={164}
        >
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`${item.media_url}`}
                srcSet={`${item.media_url}`}
                alt={item.title}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            marginTop: '50px',
          }}
        >
          No images found
        </Typography>
      )}
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
        count={pagCount}
        color='primary'
        onChange={(e, page) => handlePageChange(page)}
      />
    </center>
  );
};

export default Gallery;
