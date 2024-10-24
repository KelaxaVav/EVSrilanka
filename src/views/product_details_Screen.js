


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
                </View>
                <View>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            top: hp(2),
                        }}>
                            <Image
                                source={require('../../assets/images/frock2.jpg')}
                                style={styles.circleImage}
                                resizeMode="cover"
                            />
                            <Text style={{ color: '#000', left: hp(3), fontSize: wp(6), top: hp(1), fontWeight: 'bold' }}>Kopana Panchan</Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: wp(4), paddingVertical: hp(4) }}>
                        <Box
                            borderWidth={1}
                            borderColor="gray"
                            borderRadius="md"
                            bg="white"
                            height={hp(35)}
                        >
                            <View style={{ paddingHorizontal: wp(4), paddingVertical: hp(4) }}>


                                <Text style={{ color: '#000', bottom: hp(3), fontSize: wp(5), fontWeight: '500' }}>Wedding photographer in London</Text>
                                <Box
                                    bottom={hp(1)}
                                    backgroundColor="#000"
                                    borderRadius={5}
                                    width={wp(34)}
                                    height={wp(10)}
                                >
                                    <Text fontWeight="400" fontSize={wp(5)} color="#fff" textAlign='center' top={hp(1)}>
                                        $1500.00
                                    </Text>
                                </Box>
                                <View>
                                    <Text style={{ color: '#000', fontSize: wp(5), bottom: hp(0.5) }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                    <View
                                        style={{
                                            top: hp(1),
                                            backgroundColor: "gray",
                                            width: wp(85),
                                            borderWidth: 0.5,
                                            borderColor: "gray",
                                        }}
                                    ></View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: hp(3),
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: wp(5),

                                        }}>
                                            Aerial drone footage
                                        </Text>

                                        <Text style={{
                                            color: '#000',
                                            fontSize: wp(5),
                                            fontWeight: 'bold',

                                        }}>
                                            YES
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            top: hp(2),
                                            backgroundColor: "gray",
                                            width: wp(85),
                                            borderWidth: 0.5,
                                            borderColor: "gray",
                                        }}
                                    ></View>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: hp(4),
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: wp(5),

                                        }}>
                                            Express turnaround time
                                        </Text>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: wp(5),
                                            fontWeight: 'bold',
                                        }}>
                                            14 days
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </Box>
                    </View>


                    <Text style={{ color: '#000', paddingVertical: hp(2), paddingHorizontal: hp(2), bottom: hp(3), fontSize: hp(3), fontWeight: 'bold' }}>Benefits</Text>
                    <View style={{ paddingHorizontal: wp(4), paddingVertical: hp(4) }}>
                        <Box
                            bottom={hp(6)}
                            borderWidth={1}
                            borderColor="gray"
                            borderRadius="md"
                            bg="white"
                            height={hp(30)}
                        >
                            <View style={{ top: hp(1), padding: hp(1) }}>
                                <Text style={{ color: '#000', fontSize: wp(5), }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                <Text style={{ color: '#000', top: hp(1), fontSize: wp(5), }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                                <Text style={{ color: '#000', fontSize: wp(5), top: hp(2), }}>I have worked with severval lovely couples getting married in the past, and i always put my heart....</Text>
                            </View>
                        </Box>

                        <View style={{
                            bottom: hp(2),
                            alignItems: 'center',
                        }}>
                            <Button
                                onPress={() => console.log('Add Button Pressed')}
                                variant="solid"
                                style={{
                                    width: wp(95),
                                    height: hp(6),
                                    borderRadius: 5,
                                    backgroundColor: '#68a2e3',
                                    color: 'white',
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: wp(7), top: hp(1) }}>Buy for $299</Text>

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
        width: wp(100),
        height: hp(40),
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
