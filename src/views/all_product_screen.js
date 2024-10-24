import React from 'react';
import { Box, Image, SafeAreaView, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function AddProductScreen() {
    const navigation = useNavigation();
    const cardData = [
        {
            image: require('../../assets/images/frock1.webp'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
        {
            image: require('../../assets/images/frock2.jpg'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
        {
            image: require('../../assets/images/frock1.webp'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
        {
            image: require('../../assets/images/frock1.webp'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
        {
            image: require('../../assets/images/frock1.webp'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
        {
            image: require('../../assets/images/frock1.webp'),
            title: '$293.26',
            description: "Urban Classics vintage flared jeans in midstone washed",
        },
    ];

    return (
        <SafeAreaView style={{ top: hp(4) }}>
            <ScrollView>
                <View style={{ paddingLeft: wp(5), paddingRight: wp(5) }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                padding: wp(2),
                                borderRadius: 50,
                                backgroundColor: '#dae1e5',
                                justifyContent: 'center',
                                alignItems: 'center',
                                aspectRatio: 1
                            }}>
                                <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(5)} />
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontSize: wp(5), textAlign: 'center' }}>Digital Products</Text>
                            </View>

                            <View style={{
                                padding: wp(4),
                                borderRadius: 50,
                                aspectRatio: 1,
                            }} />
                        </View>

                    </TouchableOpacity>
                </View>
                <View style={{marginTop:5}}>
                    {cardData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Details', { itemId: index })}
                        >
                            <View style={{ padding: 15 }}>
                                <View style={{
                                    width: '100%',
                                    height: 300,
                                    // marginBottom: 20,
                                    // position: 'relative',
                                }}>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 5,
                                        }}
                                        source={item.image}
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
                                            {item.title}
                                        </Text>
                                    </Box>
                                </View>
                                <Text fontWeight="bold" fontSize={18} color="#000" top={8}>
                                    {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
