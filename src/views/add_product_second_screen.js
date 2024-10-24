import React, { useState } from 'react'
import { AlertCircleIcon, FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText, Input, InputField, SafeAreaView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, View } from '@gluestack-ui/themed'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Animated, PanResponder, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TrashIcon, ChevronDownIcon } from 'react-native-heroicons/outline'
import { Dropdown } from 'react-native-element-dropdown';

export default function AddProductSecondScreen() {
    const [benefitInputFields, setBenefitInputFields] = useState(['']);
    const [additionalDetailsInputFields, setAdditionalDetailsInputFields] = useState([]);
    const [isBenefitDeleteIconVisible, setBenefitDeleteIconVisible] = useState(Array(benefitInputFields.length).fill(false));
    const [isAdditionalDeleteIconVisible, setAddionalDeleteIconVisible] = useState(Array(additionalDetailsInputFields.length).fill(false));
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
        console.log('omdex', index);
        const updatedFields = benefitInputFields.filter((_, i) => i !== index);
        console.log("benefitInputFields", updatedFields);
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

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const categories = [
        { label: 'Technology', value: 'technology' },
        { label: 'Health', value: 'health' },
        { label: 'Finance', value: 'finance' },
        { label: 'Education', value: 'education' },
        { label: 'Entertainment', value: 'entertainment' },
    ];

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (value) => {
        if (selectedCategories.includes(value)) {
            setSelectedCategories(selectedCategories.filter(item => item !== value));
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
    }
    const [selectedValue, setSelectedValue] = useState('');
    const handleValueChange = (value) => {
        setSelectedValue(value);
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
                                        <Animated.View
                                            style={{ flex: 1, transform: [{ translateX: pan.x }] }}
                                            {...panResponder.panHandlers}
                                        >
                                            <View key={fieldValue.id} style={{ flexDirection: 'row', marginTop: hp(2) }}>
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
                                                        value={fieldValue.value}
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
                                            </View>
                                        </Animated.View>
                                    );
                                })}
                            </View>

                        </View>

                    </View>
                    <View style={{ marginTop: hp(4) }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={{ color: "#000", fontSize: wp(4) }}
                            selectedTextStyle={{ color: "#000", fontSize: wp(4) }}
                            inputSearchStyle={{ height: hp(5), fontSize: wp(4) }}
                            iconStyle={{ width: wp(8), height: wp(8) }}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder='Category'
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    {/* <FormControl isRequired isInvalid>
                        <FormControlLabel>
                            <FormControlLabelText color='#000'>
                                Choose your favorite color
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select>
                            <SelectTrigger>
                                <SelectInput placeholder="Select option" placeholderTextColor="#000"/>
                                <SelectIcon marginRight={4}>
                                    <ChevronDownIcon  color='#000' />
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent backgroundColor='#888'>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem label="Red" value="red" backgroundColor='#888'/>
                                    <SelectItem label="Blue" value="blue" backgroundColor='#888'/>
                                    <SelectItem label="Black" value="black"backgroundColor='#888' />
                                    <SelectItem label="Pink" value="pink" isDisabled={true}backgroundColor='#888' />
                                    <SelectItem label="Green" value="green"backgroundColor='#888' />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                    </FormControl> */}
                   <Select>
    <SelectTrigger>
        <SelectInput placeholder="Select option" placeholderTextColor="#000" />
        <SelectIcon marginRight={4}>
            <ChevronDownIcon color='#000' />
        </SelectIcon>
    </SelectTrigger>
    <SelectPortal>
        <SelectBackdrop />
        <SelectContent style={{ position: 'absolute', zIndex: 1000 }}>
            <SelectItem label="Red" value="red" />
            <SelectItem label="Blue" value="blue" />
            <SelectItem label="Black" value="black" />
            <SelectItem label="Pink" value="pink" isDisabled />
            <SelectItem label="Green" value="green" />
        </SelectContent>
    </SelectPortal>
</Select>




                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        color: '#000'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
});