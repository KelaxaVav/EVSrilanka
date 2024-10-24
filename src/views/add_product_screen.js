import React, { useState } from 'react'
import { Button, ButtonText, Image, Input, InputField, SafeAreaView, Text, Textarea, TextareaInput, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Controller, useForm } from 'react-hook-form';
import CustomSnackbar from '../components/custom';

export default function AddProductScreen() {
    const navigation = useNavigation();
    const { handleSubmit, control } = useForm();
    const [images, setImages] = useState(Array(5).fill(null));

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleImageUpload = async (index) => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 800,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.assets) {
                const newImages = [...images];
                newImages[index] = response.assets[0].uri;
                setImages(newImages);
            }
        });
    };

    const handleNext = (data) => {
        if (!data.name || !data.description || !data.price) {
            setSnackbarVisible(true);
            setSnackbarMessage('Please fill in all fields and upload at least one image');
            return; 
        }
        if (images.some(image => image === null)) {
            setSnackbarVisible(true);
            setSnackbarMessage('Please upload all 5 images.')
            return;
        }

        const productData = {
            name: data.name,
            description: data.description,
            price: data.price,
            images: images,
        };

        navigation.navigate('AddProductSecond', { productData });
    };

    return (
        <SafeAreaView marginTop={hp(1)}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View paddingLeft={wp(5)} paddingRight={wp(5)} marginTop={hp(4)}>
                    <View flexDirection= 'row' alignItems= 'center'>
                        <TouchableOpacity onPress={() => navigation.navigate('AllProduct')}>
                            <View 
                                padding= {wp(2)}
                                borderRadius={50}
                                backgroundColor= '#dae1e5'
                                justifyContent= 'center'
                                alignItems= 'center'
                                aspectRatio= {1}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(5)} />
                            </View>

                        </TouchableOpacity>
                        <View flex= {1} justifyContent= 'center' alignItems= 'center'>
                            <Text color='#000' fontSize= {wp(5)} textAlign= 'center' >About</Text>
                        </View>

                        <View padding= {wp(4)}borderRadius= {50}aspectRatio= {1}/>
                    </View>

                    <View marginTop= {hp(4)}>
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
                            rules={{ required: false }}
                        />


                        <View marginTop={ hp(2)}>
                            <View position= 'relative'>
                                <Controller
                                    control={control}
                                    name="description"
                                    rules={{ required: false }}
                                    render={({ field: { onChange, onBlur, value = "" } }) => (
                                        <>
                                            <Textarea>
                                                <TextareaInput
                                                    placeholder="Description"
                                                    placeholderTextColor="#888"
                                                    value={value}
                                                    onChangeText={(inputText) => {
                                                        onChange(inputText);
                                                    }}
                                                    height={hp(15)}
                                                    backgroundColor="#dae1e5"
                                                    borderColor="transparent"
                                                    borderWidth={0}
                                                    borderRadius={10}
                                                    padding={10}
                                                    paddingTop={15}
                                                    textAlignVertical='top' color='#000'
                                                />
                                            </Textarea>
                                            <Text position='absolute' bottom={hp(2)} right= {wp(5)} color= "#888" fontSize={wp(3)}>
                                                {value.length} / 2000
                                            </Text>
                                        </>
                                    )}
                                />
                            </View>
                        </View>

                        <View marginTop={ hp(2)}>
                            <View flexDirection= 'row' alignItems='center'>
                                <View width={ wp(25)}>
                                    <Text color= '#000' fontSize= {wp(5)} fontWeight= '500'>Cover photos</Text>
                                </View>
                                <View>
                                    <Text color= '#888' fontSize={ wp(4)}>(Upload up to 5 photos)</Text>
                                </View>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ marginTop: hp(2), paddingVertical: hp(1) }}
                            >
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <TouchableOpacity key={index} onPress={() => handleImageUpload(index)}>
                                        <View  width= {wp(20) }height={ wp(20)} backgroundColor= '#dae1e5' borderRadius= {10} justifyContent= 'center' alignItems= 'center' marginRight= {wp(2)}>
                                            {images[index] ? (
                                                <Image
                                                    source={{ uri: images[index] }}
                                                    width={'100%'} height={'100%'} borderRadius={10}
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


                        <View marginTop={ hp(2)}>
                            <Text color= '#000' fontSize= {wp(5)} fontWeight= {500}>Price</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        variant="outline"
                                        size="md"
                                        isDisabled={false}
                                        isInvalid={false}
                                        isReadOnly={false}
                                        marginTop={hp(2)}
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
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            keyboardType='numeric'
                                        />
                                    </Input>
                                )}
                                name="price"
                                rules={{ required: false }}
                            />
                        </View>
                        <View marginTop={hp(5)}>
                            <Button
                                 onPress={handleSubmit(handleNext)} 
                                    backgroundColor= '#68a2e3'
                                    marginTop= {20}
                                    padding= {hp(2)}
                                    borderRadius={ wp(2)}
                                    height={ hp(7)}
                                    justifyContent= 'center'
                                    alignItems= 'center'
                                >
                                <ButtonText textAlign= 'center' fontSize={wp(4.5) }color= '#fff' >Next</ButtonText>
                            </Button>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <CustomSnackbar
                visible={snackbarVisible}
                message={snackbarMessage}
                onDismiss={() => setSnackbarVisible(false)}
            />
        </SafeAreaView>
    )
}
