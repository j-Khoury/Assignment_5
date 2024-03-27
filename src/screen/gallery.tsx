import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {RefreshControl} from 'react-native';

import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageCard from '../component/card.tsx';

interface DataItem {
  id: number;
  photo: string;
  location: string;
}

const MyComponent: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<DataItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //get images from db
  const [courtImages, setCourtImages] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageSize = 10;
        const response = await fetch(
          `https://directus-production-557c.up.railway.app/items/court_image?page=${currentPage}&limit=${pageSize}`,
        );
        const data = await response.json();
        setCourtImages(prevImages => [...prevImages, ...data.data]);
      } catch (error) {
        console.error('Error fetching court images:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      setCourtImages([]);
      setCurrentPage(1);
      await fetchData();
    } catch (error) {
      console.error('Error refreshing court images:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const loadMoreData = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const handleDeletePhoto = (photoId: number) => {
    setCourtImages(courtImages.filter(photo => photo.id !== photoId));
  };

  const handleViewDetails = (photo: DataItem) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleButtonPress = async () => {
    async function addCourtImage(
      url: string,
      imageUrl: string,
      location: string,
    ): Promise<any> {
      try {
        console.log('testing in the funciton', imageUrl);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({location, photo: imageUrl}),
        });

        if (!response.ok) {
          throw new Error('Failed to add court image');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error adding court image:', error);
        throw error;
      }
    }

    // Usage
    const url =
      'https://directus-production-557c.up.railway.app/items/court_image';

    const currentLocation = 'https://g.co/kgs/3J3v2va';
    const options = {
      storageOptions: {
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      const imageurl = response.assets[0]?.uri;

      addCourtImage(url, imageurl, currentLocation);
      console.log(response);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={courtImages}
        renderItem={({item}) => (
          <PageCard
            photo={item.photo}
            id={item.id}
            location={item.location}
            onDelete={() => handleDeletePhoto(item.id)}
            onViewDetails={() => handleViewDetails(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      <Modal visible={!!selectedPhoto} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>Photo Details</Text>
          {selectedPhoto && (
            <>
              <Text>ID: {selectedPhoto.id}</Text>
              <Text>Location: {selectedPhoto.location}</Text>
              <Button title="Close" onPress={closeModal} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;
function fetchData() {
  throw new Error('Function not implemented.');
}
