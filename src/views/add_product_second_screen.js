import React, { useState } from 'react'
import { Button, ButtonText, Input, InputField, SafeAreaView, Text, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft, } from '@fortawesome/free-solid-svg-icons';
import { Animated, PanResponder, ScrollView, TouchableOpacity } from 'react-native';
import { TrashIcon } from 'react-native-heroicons/outline'
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setProduct } from '../redux/slice/product';
import CustomSnackbar from '../components/custom';

export default function AddProductSecondScreen() {
    const navigation = useNavigation();
    const [benefitInputFields, setBenefitInputFields] = useState(['']);

    const [additionalDetailsInputFields, setAdditionalDetailsInputFields] = useState([{ attribute: '', value: '' }]);
    const [isBenefitDeleteIconVisible, setBenefitDeleteIconVisible] = useState(Array(benefitInputFields.length).fill(false));
    const [isAdditionalDeleteIconVisible, setAddionalDeleteIconVisible] = useState(Array(additionalDetailsInputFields.length).fill(false));
    const { handleSubmit } = useForm();
    const dispatch = useDispatch();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const route = useRoute();
    const { productData } = route.params;

    const handleBenefitsAddField = () => {
        setBenefitInputFields([...benefitInputFields, '']);
    };
    const handleAdditionalDetailsAddField = () => {
        setAdditionalDetailsInputFields([...additionalDetailsInputFields, { attribute: '', value: '' }]);
    };

    const handleAdditionalDetailsChange = (value, index, field) => {
        const updatedFields = additionalDetailsInputFields.map((fieldValue, i) =>
            i === index ? { ...fieldValue, [field]: value } : fieldValue
        );
        setAdditionalDetailsInputFields(updatedFields);
    };

    const handleBenefitChange = (value, index) => {
        const updatedFields = [...benefitInputFields];
        updatedFields[index] = value;
        setBenefitInputFields(updatedFields);
    };

    const handleBenefitDeleteField = (index) => {
        const updatedFields = benefitInputFields.filter((_, i) => i !== index);
        setBenefitInputFields(updatedFields);
        setBenefitDeleteIconVisible((prev) => {
            const updatedVisibility = [...prev];
            updatedVisibility.splice(index, 1);
            return updatedVisibility;
        });
    };

    const handleAdditionalDeleteField = (index) => {
        const updatedFields = additionalDetailsInputFields.filter((_, i) => i !== index);
        setAdditionalDetailsInputFields(updatedFields);
        setAddionalDeleteIconVisible((prev) => {
            const updatedVisibility = [...prev];
            updatedVisibility.splice(index, 1);
            return updatedVisibility;
        });
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Dresses', value: '1' },
        { label: 'Skirts', value: '2' },
        { label: 'Shirts', value: '3' },
        { label: 'Jeans', value: '4' },
        { label: 'Children Wears', value: '5' },
        { label: 'Shorts', value: '6' },
        { label: 'Sarees', value: '7' },
        { label: 'Lingerie', value: '8' },
    ];

    const handleNext = (data) => {
        const filledBenefits = benefitInputFields.filter(benefit => benefit.trim() !== '');
        const filledAdditionalDetails = additionalDetailsInputFields.filter(
            field => field.attribute.trim() !== '' && field.value.trim() !== ''
        );
        if (filledBenefits.length === 0) {
            setSnackbarVisible(true);
            setSnackbarMessage('Please provide at least one benefit');
            return;
        }
        if (filledAdditionalDetails.length === 0) {
            setSnackbarVisible(true);
            setSnackbarMessage('Please provide at least one attribute-value pair');
            return;
        }

        const allProductData = {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            images: productData.images,
            benefits: filledBenefits,
            additional: filledAdditionalDetails,
            category: selectedCategory
        };
        dispatch(setProduct(allProductData));
        navigation.navigate('AllProduct');
    };
    return (
        <SafeAreaView marginTop={hp(4)}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View paddingLeft={wp(5)} paddingRight={wp(5)}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
                        <View flexDirection='row' alignItems='center'>
                            <View
                                padding={wp(2)}
                                borderRadius={50}
                                backgroundColor='#dae1e5'
                                justifyContent='center'
                                alignItems='center'
                                aspectRatio={1}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} color="#000" size={wp(5)} />
                            </View>

                            <View flex={1} justifyContent='center' alignItems='center'>
                                <Text color='#000' fontSize={wp(5)} textAlign='center'>Additional</Text>
                                <Text color='#000' fontSize={wp(5)} textAlign='center'>Details</Text>
                            </View>

                            <View
                                padding={wp(4)}
                                borderRadius={50}
                                aspectRatio={1}
                            />
                        </View>

                    </TouchableOpacity>


                    <View marginTop={hp(5)}>
                        <View>
                            <View flexDirection="row" justifyContent="space-between" alignItems='center'>
                                <Text color='#000' fontSize={wp(5)} fontWeight='500'>Benefits</Text>
                                <TouchableOpacity onPress={handleBenefitsAddField}>
                                    <View flexDirection="row" alignItems='center'>
                                        <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={wp(4)} />
                                        <Text color='#68a2e3' fontSize={wp(5)} fontWeight='500' marginLeft={5}>Add</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View marginTop={hp(2)}>
                                {benefitInputFields.map((fieldValue, index) => {
                                    const pan = new Animated.ValueXY();

                                    const panResponder = PanResponder.create({
                                        onMoveShouldSetPanResponder: (evt, gestureState) => {
                                            return gestureState.dx < 10;
                                        },
                                        onPanResponderMove: (evt, gestureState) => {
                                            pan.setValue({ x: gestureState.dx, y: 0 });
                                        },
                                        onPanResponderRelease: (evt, gestureState) => {
                                            if (gestureState.dx < 20) {
                                                setBenefitDeleteIconVisible((prev) => {
                                                    const updatedVisibility = [...prev];
                                                    updatedVisibility[index] = true;
                                                    return updatedVisibility;
                                                });
                                            } else {
                                                pan.flattenOffset();
                                                setBenefitDeleteIconVisible((prev) => {
                                                    const updatedVisibility = [...prev];
                                                    updatedVisibility[index] = false;
                                                    return updatedVisibility;
                                                });
                                            }
                                            pan.setValue({ x: 0, y: 0 });
                                        },
                                    });

                                    return (
                                        <View key={`benefit-${index}`} style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2) }}>
                                            <Animated.View
                                                style={{ flex: 1, transform: [{ translateX: pan.x }] }}
                                                {...panResponder.panHandlers}
                                            >
                                                <Input
                                                    variant="outline"
                                                    size="md"
                                                    isDisabled={false}
                                                    isInvalid={false}
                                                    isReadOnly={false}
                                                    flex={1}
                                                >
                                                    <InputField
                                                        placeholder="Benefits"
                                                        type="text"
                                                        color="#000"
                                                        placeholderTextColor="#888"
                                                        padding={10}
                                                        backgroundColor="#dae1e5"
                                                        borderColor="transparent"
                                                        borderWidth={0}
                                                        borderRadius={10}
                                                        height={hp(7)}
                                                        value={benefitInputFields[index] || ""}
                                                        onChangeText={(value) => handleBenefitChange(value, index)}
                                                        paddingRight={wp(10)}
                                                    />
                                                </Input>
                                            </Animated.View>

                                            {isBenefitDeleteIconVisible[index] && (
                                                <View style={{ backgroundColor: '#e74c3c', height: hp(7), width: wp(15), borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleBenefitDeleteField(index)}
                                                        style={{
                                                            height: hp(7),
                                                            width: wp(15),
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <TrashIcon size={hp(3)} color="#fff" />
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>

                                    );
                                })}
                            </View>
                        </View>

                        <View marginTop={hp(4)}>
                            <View flexDirection="row" justifyContent="space-between" alignItems='center'>
                                <Text color='#000' fontSize={wp(5)} fontWeight='500'>Additional Details</Text>
                                <TouchableOpacity onPress={handleAdditionalDetailsAddField}>
                                    <View flexDirection="row" alignItems='center' >
                                        <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={wp(4)} />
                                        <Text color='#68a2e3' fontSize={wp(5)} fontWeight='500' marginLeft={5} >Add</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View marginTop={hp(2)}>
                                {additionalDetailsInputFields.map((fieldValue, index) => {
                                    const pan = new Animated.ValueXY();

                                    const panResponder = PanResponder.create({
                                        onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx < 10,
                                        onPanResponderMove: (evt, gestureState) => {
                                            pan.setValue({ x: gestureState.dx, y: 0 });
                                        },
                                        onPanResponderRelease: (evt, gestureState) => {
                                            if (gestureState.dx < 20) {
                                                setAddionalDeleteIconVisible((prev) => {
                                                    const updatedVisibility = [...prev];
                                                    updatedVisibility[index] = true;
                                                    return updatedVisibility;
                                                });
                                            } else {
                                                pan.flattenOffset();
                                                setAddionalDeleteIconVisible((prev) => {
                                                    const updatedVisibility = [...prev];
                                                    updatedVisibility[index] = false;
                                                    return updatedVisibility;
                                                });
                                            }
                                            pan.setValue({ x: 0, y: 0 });
                                        },
                                    });

                                    return (
                                        <Animated.View key={`additional-${index}`}
                                            style={{ flex: 1, transform: [{ translateX: pan.x }] }}
                                            {...panResponder.panHandlers}
                                        >
                                            <View key={fieldValue.id} style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2) }}>
                                                <Input
                                                    variant="outline"
                                                    size="md"
                                                    isDisabled={false}
                                                    isInvalid={false}
                                                    isReadOnly={false}
                                                    flex={1} marginRight={5}
                                                >
                                                    <InputField
                                                        placeholder="Attribute"
                                                        type="text"
                                                        color="#000"
                                                        placeholderTextColor="#888"
                                                        padding={10}
                                                        backgroundColor="#dae1e5"
                                                        borderColor="transparent"
                                                        borderWidth={0}
                                                        borderRadius={10}
                                                        height={hp(7)}
                                                        value={fieldValue.attribute}
                                                        onChangeText={(value) => handleAdditionalDetailsChange(value, index, 'attribute')}
                                                    />
                                                </Input>

                                                <Input
                                                    variant="outline"
                                                    size="md"
                                                    isDisabled={false}
                                                    isInvalid={false}
                                                    isReadOnly={false}
                                                    flex={1} marginRight={5}
                                                >
                                                    <InputField
                                                        placeholder="Value"
                                                        type="text"
                                                        color="#000"
                                                        placeholderTextColor="#888"
                                                        padding={10}
                                                        backgroundColor="#dae1e5"
                                                        borderColor="transparent"
                                                        borderWidth={0}
                                                        borderRadius={10}
                                                        height={hp(7)}
                                                        value={fieldValue.value}
                                                        onChangeText={(value) => handleAdditionalDetailsChange(value, index, 'value')}
                                                    />
                                                </Input>

                                                {isAdditionalDeleteIconVisible[index] && (
                                                    <TouchableOpacity
                                                        onPress={() => handleAdditionalDeleteField(index)}
                                                        style={{
                                                            backgroundColor: '#e74c3c',
                                                            height: hp(7),
                                                            width: wp(15),
                                                            borderRadius: 5,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <TrashIcon size={hp(3)} color="#fff" />
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </Animated.View>
                                    );
                                })}
                            </View>


                        </View>

                    </View>
                    <View marginTop={hp(4)}>
                        <Dropdown
                            style={{ backgroundColor: '#dae1e5', borderRadius: 10,height:hp(7),padding:10 }} 
                            borderRadius={5} height={hp(7)} padding={10}
                            itemTextStyle={{ color: '#000' }}
                            placeholderStyle={{ color: "#000", fontSize: wp(4) }}
                            selectedTextStyle={{ color: "#000", fontSize: wp(4) }}
                            inputSearchStyle={{ height: hp(5), fontSize: wp(4) }}
                            iconStyle={{ width: wp(8), height: wp(8) }}
                            data={data}
                            search
                            color
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder='Category'
                            searchPlaceholder="Search..."
                            value={selectedCategory}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setSelectedCategory(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View marginTop={hp(5)}>
                        <Button
                            onPress={handleSubmit(handleNext)}
                            backgroundColor='#68a2e3'
                            marginTop={20}
                            padding={hp(2)}
                            borderRadius={wp(2)}
                            height={hp(7)}
                            justifyContent='center'
                            alignItems='center'
                        >
                            <ButtonText textAlign='center' fontSize={wp(4.5)} color='#fff'>Next</ButtonText>
                        </Button>
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