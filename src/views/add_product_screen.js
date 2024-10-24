import React, { useState } from 'react'
import { Button, ButtonText, Center, Image, Input, InputField, SafeAreaView, Text, Textarea, TextareaInput, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

export default function AddProductScreen() {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    // const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, errors, control } = useForm();
    const [images, setImages] = useState(Array(5).fill(null));

    const handleImageUpload = async (index) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 800,
        };

        // launchImageLibrary(options, (response) => {
        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //     } else if (response.error) {
        //         console.log('ImagePicker Error: ', response.error);
        //     } else if (response.assets) {
        //         const newImages = [...images];
        //         newImages[index] = response.assets[0].uri;
        //         setImages(newImages);
        //     }
        // });
    };

    const handleNext = (data) => {
        console.log(':daytata', data);
        console.log(':images', images);

        if (!data.name || !data.description) {
            Alert.alert('Validation Error', 'Please fill in all fields and upload at least one image.');
            return;
        }
        if (images.some(image => image === null)) {
            Alert.alert('Validation Error', 'Please upload all 5 images.');
            return;
        }

        const productData = {
            name: text,
            images,
        };

        dispatch({ type: 'SET_PRODUCT', payload: productData });

        navigation.navigate('AddProductSecond');
    };

    return (
        <SafeAreaView style={{ top: hp(1) }} >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={{ paddingLeft: wp(5), paddingRight: wp(5), top: hp(4) }}>
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
                            <Text style={{ color: '#000', fontSize: wp(5), textAlign: 'center' }}>About</Text>
                        </View>

                        <View style={{
                            padding: wp(4),
                            borderRadius: 50,
                            aspectRatio: 1,
                        }} />
                    </View>

                    <View style={{ marginTop: hp(5) }}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    variant="outline"
                                    size="md"
                                    isDisabled={false}
                                    isInvalid={false}
                                    isReadOnly={false}
                                >
                                    <InputField
                                        placeholder="Name"
                                        type="text"
                                        color="#000"
                                        placeholderTextColor="#888"
                                        padding={10}
                                        backgroundColor="#dae1e5"
                                        borderColor="transparent"
                                        borderWidth={0}
                                        borderRadius={10}
                                        height={hp(7)}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </Input>
                            )}
                            name="name"
                            rules={{ required: true }}
                        />


                        <View style={{ marginTop: hp(5) }}>
                            <View style={{ position: 'relative' }}>

                                <Controller
                                    control={control}
                                    name="description"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Textarea>
                                            <TextareaInput
                                                placeholder="Description"
                                                placeholderTextColor="#888"
                                                value={value}
                                                onChangeText={onChange}
                                                height={hp(15)}
                                                backgroundColor="#dae1e5"
                                                borderColor="transparent"
                                                borderWidth={0}
                                                borderRadius={10}
                                                padding={10}
                                                paddingTop={15}
                                                style={{ textAlignVertical: 'top', color: '#000' }}
                                            />
                                        </Textarea>
                                    )}
                                />
                                <Text style={{ position: 'absolute', bottom: hp(2), right: wp(5), color: "#888", fontSize: wp(3) }}>
                                    {text.length} / 2000
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: hp(5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: wp(25) }}>
                                    <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Cover photos</Text>
                                </View>
                                <View>
                                    <Text style={{ color: '#888', fontSize: wp(4) }}>(Upload up to 5 photos)</Text>
                                </View>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: hp(2), paddingVertical: hp(1) }}
                            >
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleImageUpload(index)}>
                                        <View style={{ width: wp(20), height: wp(20), backgroundColor: '#dae1e5', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: wp(2) }}>
                                            {images[index] ? (
                                                <Image
                                                    source={{ uri: images[index] }}
                                                    style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                                    alt={`Uploaded image ${index + 1}`}
                                                />
                                            ) : (
                                                <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={24} />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>


                        <View style={{ marginTop: hp(5) }}>
                            <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Price</Text>
                            {/* <Input
                                variant="outline"
                                size="md"
                                isDisabled={false}
                                isInvalid={false}
                                isReadOnly={false}
                                style={{ marginTop: hp(2) }}
                            >
                                <InputField
                                    placeholder="$0.00"
                                    type="text"
                                    color="#000"
                                    placeholderTextColor="#888"
                                    padding={10}
                                    backgroundColor="#dae1e5"
                                    borderColor="transparent"
                                    borderWidth={0}
                                    borderRadius={10}
                                    height={hp(7)}
                                />
                            </Input> */}
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        variant="outline"
                                        size="md"
                                        isDisabled={false}
                                        isInvalid={false}
                                        isReadOnly={false}
                                        style={{ marginTop: hp(2) }}
                                    >
                                        <InputField
                                            placeholder="$0.00"
                                            type="text"
                                            color="#000"
                                            placeholderTextColor="#888"
                                            padding={10}
                                            backgroundColor="#dae1e5"
                                            borderColor="transparent"
                                            borderWidth={0}
                                            borderRadius={10}
                                            height={hp(7)}
                                        />
                                    </Input>
                                )}
                                name="price"
                                rules={{ required: true }}
                            />
                        </View>
                        <View style={{ marginTop: hp(5) }}>
                            <Button
                                onPress={handleSubmit(handleNext)}
                                // onPress={() => navigation.navigate('AddProductSecond')}
                                style={{
                                    backgroundColor: '#68a2e3',
                                    marginTop: 20,
                                    padding: hp(2),
                                    borderRadius: wp(2),
                                    height: hp(7),
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <ButtonText style={{ textAlign: 'center', fontSize: wp(4.5), color: '#fff' }}>Next</ButtonText>
                            </Button>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
