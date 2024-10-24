import React from 'react';
import { Box, Image, SafeAreaView, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../utils/helpers';

export default function AddProductScreen() {
    const navigation = useNavigation();
    const products = useSelector((state) => state.product.products) || [];
    const dispatch = useDispatch();

    return (
        <SafeAreaView top={hp(4)}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(18) }}>
                <View paddingLeft={wp(5)} paddingRight={wp(5)}>
                    <View flexDirection='row' alignItems='center'>
                        <View
                            padding={wp(2)}
                            borderRadius={wp(10)}
                            backgroundColor='#dae1e5'
                            justifyContent='center'
                            alignItems='center'
                            aspectRatio={1}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(7)} />
                        </View>

                        <View flex= {1} justifyContent= 'center' alignItems= 'center'>
                            <Text color= '#000' fontSize={ wp(5)} textAlign= 'center' >Digital Products</Text>
                        </View>
                        <View padding={ wp(4)}borderRadius= {50}aspectRatio= {1}/>
                    </View>
                </View>
                <View marginTop={5}>
                    {products.length === 0 ? (
                        <Text textAlign='center' fontSize={wp(4)} color='#000'>No products available.</Text>
                    ) : (
                        products.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('ProductDetails', { item })}
                            >
                                <View marginHorizontal={wp(4)} marginVertical={hp(4)}>
                                    <View width={'100%'} height={hp(45)}>
                                        <Image width={'100%'} height={"100%"} borderRadius={wp(3)}
                                            source={
                                                item.images && item.images.length > 0
                                                    ? { uri: item.images[0] }
                                                    : require('../../assets/images/frock2.jpg')
                                            }
                                            alt={`Uploaded image ${index + 1}`}
                                            resizeMode="cover"
                                            accessibilityLabel={`Product ${index + 1}`}
                                        />
                                        <Box
                                            position="absolute"
                                            bottom={10}
                                            right={10}
                                            backgroundColor="#fff"
                                            padding={10}
                                            borderRadius={5}
                                        >
                                            <Text fontWeight="bold" fontSize={18} color="#000">
                                                {formatCurrency(item.price)}
                                            </Text>
                                        </Box>
                                    </View>
                                    <Text fontWeight="bold" fontSize={18} color="#000" top={8}>
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: hp(8),
                    right: wp(5),
                    width: wp(15),
                    height: wp(15),
                    borderRadius: wp(10),
                    backgroundColor: '#68a2e3',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddProduct')}
            >
                <FontAwesomeIcon icon={faPlus} color="#fff" size={wp(6)} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

