


import { AddIcon, Box, Button, Image, ScrollView, Text, View } from '@gluestack-ui/themed';

import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.swiperContainer}>
                    <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2}>
                        <View style={styles.child}>
                            <Image
                                source={require('../../assets/images/frock1.webp')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.child}>
                            <Image
                                source={require('../../assets/images/frock2.jpg')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    </SwiperFlatList>

                    <View>
                        <View style={{
                            flexDirection: 'row',
                            top: 10
                        }}>
                            <Image
                                source={require('../../assets/images/frock2.jpg')}
                                style={styles.circleImage}
                                resizeMode="cover"
                            />
                            <Text style={{ color: '#000', left: 20, fontSize: 20, top: 8, fontWeight: 'bold' }}>Kopana Panchan</Text>
                        </View>
                    </View>

                    <View style={{ padding: 10, top: 10 }}>
                        <Box
                            borderWidth={1}
                            borderColor="gray"
                            borderRadius="md"
                            bg="white"
                            width={340}
                            height={260}
                        >
                            <View style={{ padding: 10 }}>


                                <Text style={{ color: '#000', fontSize: 23, fontWeight: 'bold' }}>Wedding photographer London</Text>
                                <Box
                                    top={15}
                                    backgroundColor="#000"
                                    padding={10}
                                    borderRadius={5}
                                    width={100}
                                >
                                    <Text fontWeight="bold" fontSize={18} color="#fff">
                                        $15000.00
                                    </Text>
                                </Box>
                                <View style={{ top: 15 }}>
                                    <Text style={{ color: '#000', fontSize: 20, }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                    <View
                                        style={{
                                            top: 10,
                                            backgroundColor: "gray",
                                            width: 320,
                                            borderWidth: 1,
                                            borderColor: "gray",
                                        }}
                                    ></View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 25,
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 20,

                                        }}>
                                            Aerial drone footage
                                        </Text>

                                        <Text style={{
                                            color: '#000',
                                            fontSize: 20,
                                            fontWeight: 'bold',

                                        }}>
                                            YES
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            top: 10,
                                            backgroundColor: "gray",
                                            width: 320,
                                            borderWidth: 1,
                                            borderColor: "gray",
                                        }}
                                    ></View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 25,
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 20,
                                        }}>
                                            Express turnaround time
                                        </Text>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                        }}>
                                            14 days
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </Box>
                    </View>


                    <Text style={{ color: '#000', padding: 10, top: 10, fontSize: 23, fontWeight: 'bold' }}>Benefits</Text>
                    <View style={{ padding: 10, }}>
                        <Box
                            top={10}
                            borderWidth={1}
                            borderColor="gray"
                            borderRadius="md"
                            bg="white"
                            width={340}
                            height={260}
                        >
                            <View style={{ top: 15, padding: 10 }}>
                                <Text style={{ color: '#000', fontSize: 20, }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                <Text style={{ color: '#000', top: 10, fontSize: 20, }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                <Text style={{ color: '#000', fontSize: 20, top: 25, }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                            </View>
                        </Box>

                        <View style={{
                            top: 10,
                            padding: 20,
                            alignItems: 'center',
                        }}>
                            <Button
                                onPress={() => console.log('Add Button Pressed')}
                                variant="solid"
                                style={{
                                    width: 340,
                                    height: 50,
                                    borderRadius: 5,
                                    backgroundColor: 'lightblue',
                                    color: 'white',
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 25, top: 10 }}>Buy for $299</Text>

                            </Button>
                        </View>



                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

// const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    swiperContainer: {
        // height: height / 2,
        width: '100%',
        height: 'auto',
    },
    child: {
        width: 360,
        height: 300,
        alignItems: 'center',
    },
    image: {
        // top: 10,
        width: '100%',
        height: '95%',
        // borderRadius: 10,
    },
    circleImage: {
        bottom: 10,
        width: 50,
        height: 50,
        borderRadius: 40,
        overflow: 'hidden',
        left: 10
    },
});

export default DetailsScreen;
