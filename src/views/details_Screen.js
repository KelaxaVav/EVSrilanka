


import { Box, Image, ScrollView, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

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
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                        </View>
                    </View>

                    <View>
                        <Box
                            borderWidth={1}
                            borderColor="gray.500"
                            borderRadius="md"
                            p={4}
                            bg="white"
                            w="80%"
                            h="$8"
                        >
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Wedding photographer London</Text>
                            <Box

                                backgroundColor="#000"
                                width={10} height={50}
                                borderRadius={5}
                            >
                                <Text fontWeight="bold" fontSize={18} color="#fff">
                                    gd
                                </Text>
                            </Box>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                            <Text style={{ color: '#000', left: 40, fontSize: 20, fontWeight: 'bold' }}>Kopana Panchan</Text>
                        </Box>



                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    swiperContainer: {
        // height: height / 2,
        width: '100%',
        height: 'auto',
    },
    child: {
        width,
        alignItems: 'center',
    },
    image: {
        top: 10,
        width: '95%',
        height: '80%',
        borderRadius: 10,
    },
    circleImage: {
        bottom: 10,
        width: 50,
        height: 50,
        borderRadius: 40,
        overflow: 'hidden',
        left: 20
    },
});

export default DetailsScreen;
