import React, { useState } from 'react'
import { Button, ButtonText, Center, Input, InputField, SafeAreaView, Text, Textarea, TextareaInput, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Animated, PanResponder, ScrollView, TouchableOpacity } from 'react-native';
import { TrashIcon } from 'react-native-heroicons/outline'


export default function AddProductSecondScreen() {
    const [benefitInputFields, setBenefitInputFields] = useState(['']);
    const [isBenefitDeleteIconVisible, setBenefitDeleteIconVisible] = useState(Array(benefitInputFields.length).fill(false));
    const [isAdditionalDeleteIconVisible, setAddionalDeleteIconVisible] = useState(Array(benefitInputFields.length).fill(false));
    const [additionalDetailsInputFields, setAdditionalDetailsInputFields] = useState([{ attribute: '', value: '' }]);

    const handleBenefitsAddField = () => {
        setBenefitInputFields([...benefitInputFields, '']);
    };
    const handleAdditionalDetailsAddField = () => {
        setAdditionalDetailsInputFields([...additionalDetailsInputFields, '']);
    };

    const handleAdditionalDetailsChange = (value, index, field) => {
        const updatedFields = [...additionalDetailsInputFields];
        if (field === 'attribute') {
            updatedFields[index].attribute = value;
        } else if (field === 'value') {
            updatedFields[index].value = value;
        }
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

    return (
        <SafeAreaView style={{ top: hp(4) }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={{ paddingLeft: wp(5), paddingRight: wp(5) }}>
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
                            <Text style={{ color: '#000', fontSize: wp(5), textAlign: 'center' }}>Additional</Text>
                            <Text style={{ color: '#000', fontSize: wp(5), textAlign: 'center' }}>Details</Text>
                        </View>

                        <View style={{
                            padding: wp(4),
                            borderRadius: 50,
                            aspectRatio: 1,
                        }} />
                    </View>


                    <View style={{ marginTop: hp(5) }}>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Benefits</Text>
                                <TouchableOpacity onPress={handleBenefitsAddField}>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={wp(4)} />
                                        <Text style={{ color: '#68a2e3', fontSize: wp(5), fontWeight: '500', marginLeft: 5 }}>Add</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: hp(2) }}>
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
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2) }}>
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
                                                    style={{ flex: 1 }}
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
                                                        value={fieldValue}
                                                        onChangeText={(value) => handleBenefitChange(value, index)}
                                                        style={{ paddingRight: wp(10) }}
                                                    />
                                                    {isBenefitDeleteIconVisible[index] && (
                                                        <View style={{ backgroundColor: '#e74c3c' }}>
                                                            <TouchableOpacity
                                                                onPress={() => handleBenefitDeleteField(index)}
                                                                style={{
                                                                    height: hp(7),
                                                                    width: wp(15),
                                                                    position: 'absolute',
                                                                    right: 0,
                                                                    top: '50%',
                                                                    transform: [{ translateY: -hp(7) }],
                                                                    backgroundColor: '#e74c3c',
                                                                    borderRadius: 5,
                                                                    padding: 10,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <TrashIcon size={hp(3)} color="#fff" />
                                                            </TouchableOpacity>

                                                        </View>
                                                    )}
                                                </Input>
                                            </Animated.View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={{ marginTop: hp(4) }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                                <Text style={{ color: '#000', fontSize: wp(5), fontWeight: '500' }}>Additional Details</Text>
                                <TouchableOpacity onPress={handleAdditionalDetailsAddField}>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faAdd} color="#68a2e3" size={wp(4)} />
                                        <Text style={{ color: '#68a2e3', fontSize: wp(5), fontWeight: '500', marginLeft: 5 }}>Add</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: hp(2) }}>
                                {additionalDetailsInputFields.map((fieldValue, index) => {
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
                                        <View key={index} style={{ flexDirection: 'row', marginTop: hp(2) }}>
                                            <Input
                                                variant="outline"
                                                size="md"
                                                isDisabled={false}
                                                isInvalid={false}
                                                isReadOnly={false}
                                                style={{ flex: 1, marginRight: 5 }}
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
                                                    value={fieldValue}
                                                    onChangeText={(value) => handleAdditionalDetailsChange(value, index, 'attribute')}
                                                />
                                            </Input>
                                            <Animated.View style={{ flex: 1, transform: [{ translateX: pan.x }] }}
                                                {...panResponder.panHandlers}>
                                                <Input
                                                    variant="outline"
                                                    size="md"
                                                    isDisabled={false}
                                                    isInvalid={false}
                                                    isReadOnly={false}
                                                    style={{ flex: 1 }}
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
                                                        value={fieldValue}
                                                        onChangeText={(value) => handleAdditionalDetailsChange(value, index, 'value')}
                                                    />
                                                    {isAdditionalDeleteIconVisible[index] && (
                                                        <View style={{ backgroundColor: '#e74c3c' }}>
                                                            <TouchableOpacity
                                                                onPress={() => handleAdditionalDeleteField(index)}
                                                                style={{
                                                                    height: hp(7),
                                                                    width: wp(15),
                                                                    position: 'absolute',
                                                                    right: 0,
                                                                    top: '50%',
                                                                    transform: [{ translateY: -hp(7) }],
                                                                    backgroundColor: '#e74c3c',
                                                                    borderRadius: 5,
                                                                    padding: 10,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <TrashIcon size={hp(3)} color="#fff" />
                                                            </TouchableOpacity>

                                                        </View>
                                                    )}
                                                </Input>
                                            </Animated.View>
                                        </View>
                                    );

                                })}
                            </View>

                        </View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}