


import { Box, Button, ButtonText, Image, ScrollView, Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatCurrency, formatCurrencySingle } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function ProductDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { item } = route.params;
    const images = item.images || [];
    const { width } = Dimensions.get('window');
    const additional = item.additional;
    const benefits = item.benefits;
    return (
        <View flex= {1} backgroundColor= 'white'>
            <ScrollView>
                <View>
                    <View flex={1} position='relative'>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AllProduct') }
                            style={{
                                position: 'absolute',
                                top: hp(2),
                                left: wp(3),
                                padding: wp(2),
                                backgroundColor: '#dae1e5',
                                borderRadius: wp(10),
                                zIndex: 1,
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(7)} />
                        </TouchableOpacity>

                        <SwiperFlatList
                            autoplay
                            autoplayDelay={2}
                            autoplayLoop
                            index={0}
                        >
                            {images.map((imageUri, index) => (
                                <View key={index} alignItems='center' justifyContent='center' width={width} height={width * 0.8}>
                                    <Image
                                        width={width}
                                        height={width * 0.8}
                                        source={{ uri: imageUri }}
                                        alt={`Uploaded image ${index + 1}`}
                                        resizeMode="cover"
                                    />
                                </View>
                            ))}
                        </SwiperFlatList>
                    </View>
                    <View marginHorizontal={wp(4)} marginVertical={hp(4)}>
                        <View flexDirection='row' alignItems='center'>
                            <Image
                                source={require('../../assets/images/camera.jpg')}
                                width={wp(15)} height={wp(15)} borderRadius={wp(10)} overflow='hidden'
                                resizeMode="cover"
                                alt={`Uploaded image`}
                            />
                            <Text color='#000' fontSize={wp(5)} marginLeft={wp(2)} fontWeight={500}>Kelaxa</Text>
                        </View>

                        <View marginTop={hp(3)}>
                            <Box borderWidth={1}
                                borderColor="#ccc"
                                borderRadius={wp(2)}
                                backgroundColor='#fff'
                            >
                                <View paddingVertical={hp(2)} paddingHorizontal={wp(4)}>
                                    <Text color='#000' fontSize={wp(5)} fontWeight={700} marginBottom={hp(2)}>{item.name}</Text>
                                    <View backgroundColor='#000' borderRadius={wp(1)} paddingHorizontal={wp(8)} paddingVertical={hp(1)} alignSelf='flex-start' marginBottom={hp(1)}>
                                        <Text fontWeight={400} fontSize={wp(5)} color="#fff"> {formatCurrency(item.price)}</Text>
                                    </View>
                                    <Text fontWeight={400} color='#000' fontSize={wp(4.5)}>{item.description}</Text>

                                </View>
                                <View height={hp(0.1)} backgroundColor='#ccc' width="100%" />

                                {additional.length > 0 && (
                                    <View>
                                        {additional.map((detail, index) => (
                                            <View key={index}>
                                                <View flexDirection='row' justifyContent='space-between' paddingVertical={hp(2)} paddingHorizontal={wp(4)}>
                                                    <Text color='#000' fontWeight={400} fontSize={wp(5)}>{detail.attribute}</Text>
                                                    <Text color='#000' fontWeight={600} fontSize={wp(5)}>{detail.value}</Text>
                                                </View>
                                                {index < additional.length - 1 && (
                                                    <View height={hp(0.1)} backgroundColor='#ccc' marginVertical={hp(1)} />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                )}

                            </Box>
                            <View marginTop={hp(3)}>
                                <Text color='#000' fontWeight={600} fontSize={wp(6)} marginBottom={hp(2)}>Benefits</Text>
                                <Box borderWidth={1}
                                    borderColor="#ccc"
                                    borderRadius={wp(2)}
                                    backgroundColor='#fff'
                                >
                                    <View paddingVertical={hp(2)} paddingHorizontal={wp(4)}>
                                        {benefits.map((benefit, index) => (
                                            <Text key={`benefit-${index}`} color='#000' fontSize={wp(4.5)} fontWeight={400} marginBottom={hp(1)}>{benefit}</Text>
                                        ))}
                                    </View>
                                </Box>
                            </View>
                            <View marginTop={hp(5)}>
                                <Button
                                    backgroundColor='#68a2e3'
                                    borderRadius={wp(2)}
                                    height={hp(7)}
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <ButtonText textAlign='center' fontSize={wp(4.5)} color='#fff'> {`Buy for ${formatCurrencySingle(item.price)}`} </ButtonText>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};