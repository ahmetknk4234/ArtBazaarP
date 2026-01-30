import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton, UpButton } from '../src/components';

const { width } = Dimensions.get('window');

const categories = [
    { id: 'resim', name: 'Resim' },
    { id: 'heykel', name: 'Heykel' },
    { id: 'dijital', name: 'Dijital Sanat' },
    { id: 'fotograf', name: 'Fotoğraf' },
    { id: 'karisik', name: 'Karışık Teknik' },
    { id: 'baski', name: 'Baskı' },
];

export default function SalesPage() {
    const [currentStep, setCurrentStep] = useState(1);
    
    // Step 1 states
    const [artworkName, setArtworkName] = useState('');
    const [artworkDescription, setArtworkDescription] = useState('');
    
    // Step 2 states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [technicalDetails, setTechnicalDetails] = useState('');
    const [productionYear, setProductionYear] = useState('');
    const [height, setHeight] = useState('');
    const [widthDim, setWidthDim] = useState('');
    const [depth, setDepth] = useState('');

    const toggleCategory = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleNextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getProgressLabel = () => {
        switch (currentStep) {
            case 1:
                return 'Eser Bilgisi';
            case 2:
                return 'Eserin Detayları';
            case 3:
                return 'Fiyatlandırma';
            default:
                return '';
        }
    };

    const getSectionTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Eserin Temel Bilgileri ve Görselleri';
            case 2:
                return 'Eserin Teknik Detayları Hakkında Bilgi';
            case 3:
                return 'Fiyat ve Satış Bilgileri';
            default:
                return '';
        }
    };

    const renderStep1 = () => (
        <>
            {/* Artwork Images Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Eserinizin Görselleri</Text>
                
                <View style={styles.imageUploadContainer}>
                    {[1, 2, 3].map((item) => (
                        <View key={item} style={styles.imageUploadBox}>
                            <TouchableOpacity style={styles.uploadButton}>
                                <View style={styles.uploadIconContainer}>
                                    <Text style={styles.uploadIcon}>📷</Text>
                                    <Text style={styles.uploadPlus}>+</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.removeButton}>
                                <Text style={styles.removeIcon}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            {/* Artwork Name Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Eserinizin Adı</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Örn: Mercan Rüyası 50X70"
                    placeholderTextColor="#999"
                    value={artworkName}
                    onChangeText={setArtworkName}
                />
            </View>

            {/* Artwork Description Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Eserinizin Açıklaması</Text>
                <TextInput
                    style={[styles.textInput, styles.textAreaInput]}
                    placeholder="Bu alanda eserinizin hikayesini, ilham kaynağınızı, üretim sürecinizi ve koleksiyonerler için önemli detayları anlatın."
                    placeholderTextColor="#999"
                    value={artworkDescription}
                    onChangeText={setArtworkDescription}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>

            {/* Certificate Upload Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Orijinallik Sertifikası</Text>
                
                <View style={styles.certificateUploadBox}>
                    <TouchableOpacity style={styles.certificateUploadButton}>
                        <View style={styles.certificateIconContainer}>
                            <Text style={styles.documentIcon}>📄</Text>
                            <Text style={styles.uploadPlus}>+</Text>
                        </View>
                        <Text style={styles.certificateUploadText}>Sertifika Yükle</Text>
                        <Text style={styles.certificateUploadSubtext}>
                            PDF, JPEG veya PNG (max. 10MB)
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton}>
                        <Text style={styles.removeIcon}>×</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

    const renderStep2 = () => (
        <>
            {/* Categories Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Eserinizin Görselleri</Text>
                
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryChip}
                            onPress={() => toggleCategory(category.id)}
                        >
                            <Text style={styles.categoryChipText}>{category.name}</Text>
                            <View style={[
                                styles.toggleOuter,
                                selectedCategories.includes(category.id) && styles.toggleOuterActive
                            ]}>
                                <View style={[
                                    styles.toggleInner,
                                    selectedCategories.includes(category.id) && styles.toggleInnerActive
                                ]} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Technical Details Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Teknik Detaylar</Text>
                <TextInput
                    style={[styles.textInput, styles.textAreaInputSmall]}
                    placeholder="Teknik (örn. Tuval üzeri yağlı boya)"
                    placeholderTextColor="#999"
                    value={technicalDetails}
                    onChangeText={setTechnicalDetails}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />
            </View>

            {/* Production Year Section */}
            <View style={styles.formSection}>
                <Text style={styles.fieldLabel}>Yapım Yılı</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder=""
                    placeholderTextColor="#999"
                    value={productionYear}
                    onChangeText={setProductionYear}
                    keyboardType="numeric"
                />
            </View>

            {/* Dimensions Section */}
            <View style={styles.formSection}>
                <View style={styles.dimensionsHeader}>
                    <Text style={styles.fieldLabel}>Boyutlar</Text>
                    <View style={styles.unitBadge}>
                        <Text style={styles.unitText}>cm</Text>
                    </View>
                </View>
                
                <View style={styles.dimensionsContainer}>
                    <View style={styles.dimensionInputWrapper}>
                        <TextInput
                            style={styles.dimensionInput}
                            placeholder="Yükseklik"
                            placeholderTextColor="#999"
                            value={height}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.dimensionInputWrapper}>
                        <TextInput
                            style={styles.dimensionInput}
                            placeholder="Genişlik"
                            placeholderTextColor="#999"
                            value={widthDim}
                            onChangeText={setWidthDim}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.dimensionInputWrapper}>
                        <TextInput
                            style={styles.dimensionInput}
                            placeholder="Derinlik"
                            placeholderTextColor="#999"
                            value={depth}
                            onChangeText={setDepth}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <BackButton onPress={currentStep > 1 ? handlePrevStep : undefined} />
                
                <Text style={styles.headerTitle}>Eserlerini Yayınla</Text>
                
                <UpButton />
            </View>

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Progress Indicator */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>{getProgressLabel()}</Text>
                        <Text style={styles.progressStep}>{currentStep}/3</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBarFilled, { width: `${(currentStep / 3) * 100}%` }]} />
                    </View>
                </View>

                {/* Section Title */}
                <Text style={styles.sectionTitle}>
                    {getSectionTitle()}
                </Text>

                {/* Step Content */}
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}

                {/* Bottom Spacing */}
                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Next Step Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Sonraki Adım</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    scrollView: {
        flex: 1,
    },
    progressSection: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    progressStep: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: '#E5E5E5',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFilled: {
        height: '100%',
        backgroundColor: '#333333',
        borderRadius: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    formSection: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 12,
    },
    imageUploadContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    imageUploadBox: {
        flex: 1,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderStyle: 'dashed',
        borderRadius: 12,
        backgroundColor: '#F8F8F8',
        position: 'relative',
    },
    uploadButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIcon: {
        fontSize: 32,
        marginBottom: 4,
    },
    uploadPlus: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666666',
        marginTop: -8,
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        backgroundColor: '#000000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeIcon: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginTop: -2,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#000000',
    },
    textAreaInput: {
        minHeight: 100,
        paddingTop: 14,
    },
    textAreaInputSmall: {
        minHeight: 80,
        paddingTop: 14,
    },
    certificateUploadBox: {
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderStyle: 'dashed',
        borderRadius: 12,
        backgroundColor: '#F8F8F8',
        paddingVertical: 32,
        paddingHorizontal: 16,
        position: 'relative',
    },
    certificateUploadButton: {
        alignItems: 'center',
    },
    certificateIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    documentIcon: {
        fontSize: 40,
        marginBottom: 4,
    },
    certificateUploadText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 4,
    },
    certificateUploadSubtext: {
        fontSize: 12,
        color: '#999999',
    },
    // Step 2 Styles
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 14,
        gap: 8,
    },
    categoryChipText: {
        fontSize: 13,
        color: '#000000',
        fontWeight: '500',
    },
    toggleOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleOuterActive: {
        borderColor: '#000000',
    },
    toggleInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    toggleInnerActive: {
        backgroundColor: '#000000',
    },
    dimensionsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    unitBadge: {
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    unitText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    dimensionsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    dimensionInputWrapper: {
        flex: 1,
    },
    dimensionInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 13,
        color: '#000000',
        textAlign: 'center',
    },
    bottomButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    nextButton: {
        backgroundColor: '#000000',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
