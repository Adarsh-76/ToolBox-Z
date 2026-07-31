import React from 'react';

// Dynamically import all tools and their Info components
const WordCounter = React.lazy(() => import('./components/WordCounter'));
const WordCounterInfo = React.lazy(() => import('./components/WordCounterInfo'));
const PasswordGenerator = React.lazy(() => import('./components/PasswordGenerator'));
const PasswordGeneratorInfo = React.lazy(() => import('./components/PasswordGeneratorInfo'));
const ColorPicker = React.lazy(() => import('./components/ColorPicker'));
const ColorPickerInfo = React.lazy(() => import('./components/ColorPickerInfo'));
const JsonFormatter = React.lazy(() => import('./components/JsonFormatter'));
const JsonFormatterInfo = React.lazy(() => import('./components/JsonFormatterInfo'));
const Base64Tool = React.lazy(() => import('./components/Base64Tool'));
const Base64Info = React.lazy(() => import('./components/Base64Info'));
const CssGenerator = React.lazy(() => import('./components/CssGenerator'));
const CssGeneratorInfo = React.lazy(() => import('./components/CssGeneratorInfo'));
const PdfGenerator = React.lazy(() => import('./components/PdfGenerator'));
const PdfGeneratorInfo = React.lazy(() => import('./components/PdfGeneratorInfo'));
const PdfToWordConverter = React.lazy(() => import('./components/PdfToWordConverter'));
const PdfToWordConverterInfo = React.lazy(() => import('./components/PdfToWordConverterInfo'));
const ImagesToPdfConverter = React.lazy(() => import('./components/ImagesToPdfConverter'));
const ImagesToPdfConverterInfo = React.lazy(() => import('./components/ImagesToPdfConverterInfo'));
const WordToPdfConverter = React.lazy(() => import('./components/WordToPdfConverter'));
const WordToPdfConverterInfo = React.lazy(() => import('./components/WordToPdfConverterInfo'));
const ExcelToPdfConverter = React.lazy(() => import('./components/ExcelToPdfConverter'));
const ExcelToPdfConverterInfo = React.lazy(() => import('./components/ExcelToPdfConverterInfo'));
const PdfToExcelConverter = React.lazy(() => import('./components/PdfToExcelConverter'));
const PdfToExcelConverterInfo = React.lazy(() => import('./components/PdfToExcelConverterInfo'));
const PowerpointToPdfConverter = React.lazy(() => import('./components/PowerpointToPdfConverter'));
const PowerpointToPdfConverterInfo = React.lazy(() => import('./components/PowerpointToPdfConverterInfo'));
const PdfToPptConverter = React.lazy(() => import('./components/PdfToPptConverter'));
const PdfToPptConverterInfo = React.lazy(() => import('./components/PdfToPptConverterInfo'));
const MergePdf = React.lazy(() => import('./components/MergePdf'));
const MergePdfInfo = React.lazy(() => import('./components/MergePdfInfo'));
const PdfToCsvConverter = React.lazy(() => import('./components/PdfToCsvConverter'));
const PdfToCsvConverterInfo = React.lazy(() => import('./components/PdfToCsvConverterInfo'));
const IpLookup = React.lazy(() => import('./components/IpLookup'));
const IpLookupInfo = React.lazy(() => import('./components/IpLookupInfo'));
const HttpHeadersChecker = React.lazy(() => import('./components/HttpHeadersChecker'));
const HttpHeadersCheckerInfo = React.lazy(() => import('./components/HttpHeadersCheckerInfo'));
const ComparePdf = React.lazy(() => import('./components/ComparePdf'));
const ComparePdfInfo = React.lazy(() => import('./components/ComparePdfInfo'));
const SplitPdf = React.lazy(() => import('./components/SplitPdf'));
const SplitPdfInfo = React.lazy(() => import('./components/SplitPdfInfo'));
const CompressPdf = React.lazy(() => import('./components/CompressPdf'));
const CompressPdfInfo = React.lazy(() => import('./components/CompressPdfInfo'));
const RotatePdf = React.lazy(() => import('./components/RotatePdf'));
const RotatePdfInfo = React.lazy(() => import('./components/RotatePdfInfo'));
const RearrangePdf = React.lazy(() => import('./components/RearrangePdf'));
const RearrangePdfInfo = React.lazy(() => import('./components/RearrangePdfInfo'));
const AddPagesPdf = React.lazy(() => import('./components/AddPagesPdf'));
const AddPagesPdfInfo = React.lazy(() => import('./components/AddPagesPdfInfo'));
const TwitterThread = React.lazy(() => import('./components/TwitterThread'));
const TwitterThreadInfo = React.lazy(() => import('./components/TwitterThreadInfo'));
const PdfWatermark = React.lazy(() => import('./components/PdfWatermark'));
const PdfWatermarkInfo = React.lazy(() => import('./components/PdfWatermarkInfo'));
const PdfSecurity = React.lazy(() => import('./components/PdfSecurity'));
const PdfSecurityInfo = React.lazy(() => import('./components/PdfSecurityInfo'));
const FancyTextGenerator = React.lazy(() => import('./components/FancyTextGenerator'));
const FancyTextGeneratorInfo = React.lazy(() => import('./components/FancyTextGeneratorInfo'));
const RedditDownloader = React.lazy(() => import('./components/RedditDownloader'));
const RedditDownloaderInfo = React.lazy(() => import('./components/RedditDownloaderInfo'));
const YoutubeBannerMaker = React.lazy(() => import('./components/YoutubeBannerMaker'));
const YoutubeBannerMakerInfo = React.lazy(() => import('./components/YoutubeBannerMakerInfo'));
const FuelPriceTracker = React.lazy(() => import('./components/FuelPriceTracker'));
const FuelPriceTrackerInfo = React.lazy(() => import('./components/FuelPriceTrackerInfo'));
const SilverPriceChecker = React.lazy(() => import('./components/SilverPriceChecker'));
const SilverPriceCheckerInfo = React.lazy(() => import('./components/SilverPriceCheckerInfo'));
const PlagiarismChecker = React.lazy(() => import('./components/PlagiarismChecker'));
const PlagiarismCheckerInfo = React.lazy(() => import('./components/PlagiarismCheckerInfo'));
const EmiCalculator = React.lazy(() => import('./components/EmiCalculator'));
const EmiCalculatorInfo = React.lazy(() => import('./components/EmiCalculatorInfo'));
const LoremIpsumGenerator = React.lazy(() => import('./components/LoremIpsumGenerator'));
const LoremIpsumGeneratorInfo = React.lazy(() => import('./components/LoremIpsumGeneratorInfo'));
const BmiCalculator = React.lazy(() => import('./components/BmiCalculator'));
const BmiCalculatorInfo = React.lazy(() => import('./components/BmiCalculatorInfo'));
const PasswordStrengthChecker = React.lazy(() => import('./components/PasswordStrengthChecker'));
const PasswordStrengthCheckerInfo = React.lazy(() => import('./components/PasswordStrengthCheckerInfo'));
const WorldClock = React.lazy(() => import('./components/WorldClock'));
const WorldClockInfo = React.lazy(() => import('./components/WorldClockInfo'));
const PercentageCalculator = React.lazy(() => import('./components/PercentageCalculator'));                                                     
const PercentageCalculatorInfo = React.lazy(() => import('./components/PercentageCalculatorInfo'));
const AgeCalculator = React.lazy(() => import('./components/AgeCalculator'));
const AgeCalculatorInfo = React.lazy(() => import('./components/AgeCalculatorInfo'));
const CurrencyConverter = React.lazy(() => import('./components/CurrencyConverter'));
const CurrencyConverterInfo = React.lazy(() => import('./components/CurrencyConverterInfo'));
const BarcodeGenerator = React.lazy(() => import('./components/BarcodeGenerator'));
const BarcodeGeneratorInfo = React.lazy(() => import('./components/BarcodeGeneratorInfo'));
const GoldPriceChecker = React.lazy(() => import('./components/GoldPriceChecker'));
const GoldPriceCheckerInfo = React.lazy(() => import('./components/GoldPriceCheckerInfo'));
const EmojiMixer = React.lazy(() => import('./components/EmojiMixer'));
const EmojiMixerInfo = React.lazy(() => import('./components/EmojiMixerInfo'));
const MediaEnhancer = React.lazy(() => import('./components/MediaEnhancer'));
const MediaEnhancerInfo = React.lazy(() => import('./components/MediaEnhancerInfo'));
const ImageToText = React.lazy(() => import('./components/ImageToText'));
const ImageToTextInfo = React.lazy(() => import('./components/ImageToTextInfo'));
const ImageDescriber = React.lazy(() => import('./components/ImageDescriber'));
const ImageDescriberInfo = React.lazy(() => import('./components/ImageDescriberInfo'));
const PaletteGenerator = React.lazy(() => import('./components/PaletteGenerator'));
const PaletteGeneratorInfo = React.lazy(() => import('./components/PaletteGeneratorInfo'));
const MarkdownPreviewer = React.lazy(() => import('./components/MarkdownPreviewer'));
const MarkdownPreviewerInfo = React.lazy(() => import('./components/MarkdownPreviewerInfo'));
const QrGenerator = React.lazy(() => import('./components/QrGenerator'));
const QrGeneratorInfo = React.lazy(() => import('./components/QrGeneratorInfo'));
const CaseConverter = React.lazy(() => import('./components/CaseConverter'));
const CaseConverterInfo = React.lazy(() => import('./components/CaseConverterInfo'));
const ImageConverter = React.lazy(() => import('./components/ImageConverter'));
const ImageConverterInfo = React.lazy(() => import('./components/ImageConverterInfo'));
const ImageResizer = React.lazy(() => import('./components/ImageResizer'));
const ImageResizerInfo = React.lazy(() => import('./components/ImageResizerInfo'));
const ImageCompressor = React.lazy(() => import('./components/ImageCompressor'));
const ImageCompressorInfo = React.lazy(() => import('./components/ImageCompressorInfo'));
const GifMaker = React.lazy(() => import('./components/GifMaker'));
const GifMakerInfo = React.lazy(() => import('./components/GifMakerInfo'));
const ImageCropper = React.lazy(() => import('./components/ImageCropper'));
const ImageCropperInfo = React.lazy(() => import('./components/ImageCropperInfo'));
const BackgroundRemover = React.lazy(() => import('./components/BackgroundRemover'));
const BackgroundRemoverInfo = React.lazy(() => import('./components/BackgroundRemoverInfo'));
const ImageRotator = React.lazy(() => import('./components/ImageRotator'));
const ImageRotatorInfo = React.lazy(() => import('./components/ImageRotatorInfo'));
const WatermarkAdder = React.lazy(() => import('./components/WatermarkAdder'));
const WatermarkAdderInfo = React.lazy(() => import('./components/WatermarkAdderInfo'));
const BrightnessAdjuster = React.lazy(() => import('./components/BrightnessAdjuster'));
const BrightnessAdjusterInfo = React.lazy(() => import('./components/BrightnessAdjusterInfo'));
const MetadataViewer = React.lazy(() => import('./components/MetadataViewer'));
const MetadataViewerInfo = React.lazy(() => import('./components/MetadataViewerInfo'));
const ScientificCalculator = React.lazy(() => import('./components/ScientificCalculator'));
const ScientificCalculatorInfo = React.lazy(() => import('./components/ScientificCalculatorInfo'));
const ImageBlur = React.lazy(() => import('./components/ImageBlur'));
const ImageBlurInfo = React.lazy(() => import('./components/ImageBlurInfo'));
const UuidGenerator = React.lazy(() => import('./components/UuidGenerator'));
const UuidGeneratorInfo = React.lazy(() => import('./components/UuidGeneratorInfo'));
const SpeechTool = React.lazy(() => import('./components/SpeechTool'));
const SpeechToolInfo = React.lazy(() => import('./components/SpeechToolInfo'));
const ImageSharpener = React.lazy(() => import('./components/ImageSharpener'));                                                                 
const ImageSharpenerInfo = React.lazy(() => import('./components/ImageSharpenerInfo'));
const IconConverter = React.lazy(() => import('./components/IconConverter'));
const IconConverterInfo = React.lazy(() => import('./components/IconConverterInfo'));
const PhotoCollageMaker = React.lazy(() => import('./components/PhotoCollageMaker'));
const PhotoCollageMakerInfo = React.lazy(() => import('./components/PhotoCollageMakerInfo'));
const PomodoroTimer = React.lazy(() => import('./components/PomodoroTimer'));
const PomodoroTimerInfo = React.lazy(() => import('./components/PomodoroTimerInfo'));
const SocialMediaResizer = React.lazy(() => import('./components/SocialMediaResizer'));
const SocialMediaResizerInfo = React.lazy(() => import('./components/SocialMediaResizerInfo'));
const YoutubeThumbnail = React.lazy(() => import('./components/YoutubeThumbnail'));
const YoutubeThumbnailInfo = React.lazy(() => import('./components/YoutubeThumbnailInfo'));
const InstagramDownloader = React.lazy(() => import('./components/InstagramDownloader'));
const InstagramDownloaderInfo = React.lazy(() => import('./components/InstagramDownloaderInfo'));
const TwitterVideoDownloader = React.lazy(() => import('./components/TwitterVideoDownloader'));
const TwitterVideoDownloaderInfo = React.lazy(() => import('./components/TwitterVideoDownloaderInfo'));
const FacebookVideoDownloader = React.lazy(() => import('./components/FacebookVideoDownloader'));
const FacebookVideoDownloaderInfo = React.lazy(() => import('./components/FacebookVideoDownloaderInfo'));
const TikTokVideoDownloader = React.lazy(() => import('./components/TikTokVideoDownloader'));
const TikTokVideoDownloaderInfo = React.lazy(() => import('./components/TikTokVideoDownloaderInfo'));
const YoutubeTagsExtractor = React.lazy(() => import('./components/YoutubeTagsExtractor'));
const YoutubeTagsExtractorInfo = React.lazy(() => import('./components/YoutubeTagsExtractorInfo'));
const ImageToJpgConverter = React.lazy(() => import('./components/ImageToJpgConverter'));
const ImageToJpgConverterInfo = React.lazy(() => import('./components/ImageToJpgConverterInfo'));
const HashtagGenerator = React.lazy(() => import('./components/HashtagGenerator'));
const HashtagGeneratorInfo = React.lazy(() => import('./components/HashtagGeneratorInfo'));
const EmojiKeyboard = React.lazy(() => import('./components/EmojiKeyboard'));
const EmojiKeyboardInfo = React.lazy(() => import('./components/EmojiKeyboardInfo'));                                                           
const TwitterCounter = React.lazy(() => import('./components/TwitterCounter'));
const TwitterCounterInfo = React.lazy(() => import('./components/TwitterCounterInfo'));
const IgStoryMaker = React.lazy(() => import('./components/IgStoryMaker'));
const IgStoryMakerInfo = React.lazy(() => import('./components/IgStoryMakerInfo'));
const FbCoverResizer = React.lazy(() => import('./components/FbCoverResizer'));
const FbCoverResizerInfo = React.lazy(() => import('./components/FbCoverResizerInfo'));
const LinkedInScheduler = React.lazy(() => import('./components/LinkedInScheduler'));
const LinkedInSchedulerInfo = React.lazy(() => import('./components/LinkedInSchedulerInfo'));
const SocialMediaPostGenerator = React.lazy(() => import('./components/SocialMediaPostGenerator'));
const SocialMediaPostGeneratorInfo = React.lazy(() => import('./components/SocialMediaPostGeneratorInfo'));
const ToolComparison = React.lazy(() => import('./components/ToolComparison'));
const ToolComparisonInfo = React.lazy(() => import('./components/ToolComparisonInfo'));
const PinterestDownloader = React.lazy(() => import('./components/PinterestDownloader'));
const PinterestDownloaderInfo = React.lazy(() => import('./components/PinterestDownloaderInfo'));
const SocialAnalytics = React.lazy(() => import('./components/SocialAnalytics'));
const SocialAnalyticsInfo = React.lazy(() => import('./components/SocialAnalyticsInfo'));
const YoutubeDownloader = React.lazy(() => import('./components/YoutubeDownloader'));
const YoutubeDownloaderInfo = React.lazy(() => import('./components/YoutubeDownloaderInfo'));
const DailymotionDownloader = React.lazy(() => import('./components/DailymotionDownloader'));
const DailymotionDownloaderInfo = React.lazy(() => import('./components/DailymotionDownloaderInfo'));
const CricketScores = React.lazy(() => import('./components/CricketScores'));
const CricketScoresInfo = React.lazy(() => import('./components/CricketScoresInfo'));
const ApiResponseViewer = React.lazy(() => import('./components/ApiResponseViewer'));
const ApiResponseViewerInfo = React.lazy(() => import('./components/ApiResponseViewerInfo'));
const TextToHandwriting = React.lazy(() => import('./components/TextToHandwriting'));
const TextToHandwritingInfo = React.lazy(() => import('./components/TextToHandwritingInfo'));
const FakeDataGenerator = React.lazy(() => import('./components/FakeDataGenerator'));
const FakeDataGeneratorInfo = React.lazy(() => import('./components/FakeDataGeneratorInfo'));
const HashGenerator = React.lazy(() => import('./components/HashGenerator'));
const HashGeneratorInfo = React.lazy(() => import('./components/HashGeneratorInfo'));
const MetaTagGenerator = React.lazy(() => import('./components/MetaTagGenerator'));
const MetaTagGeneratorInfo = React.lazy(() => import('./components/MetaTagGeneratorInfo'));
const WifiQrGenerator = React.lazy(() => import('./components/WifiQrGenerator'));
const WifiQrGeneratorInfo = React.lazy(() => import('./components/WifiQrGeneratorInfo'));
const ContrastChecker = React.lazy(() => import('./components/ContrastChecker'));
const ContrastCheckerInfo = React.lazy(() => import('./components/ContrastCheckerInfo'));
const ExifRemover = React.lazy(() => import('./components/ExifRemover'));
const ExifRemoverInfo = React.lazy(() => import('./components/ExifRemoverInfo'));
const RegexTester = React.lazy(() => import('./components/RegexTester'));
const RegexTesterInfo = React.lazy(() => import('./components/RegexTesterInfo'));
const ColorPaletteExtractor = React.lazy(() => import('./components/ColorPaletteExtractor'));
const ColorPaletteExtractorInfo = React.lazy(() => import('./components/ColorPaletteExtractorInfo'));
const HearingTest = React.lazy(() => import('./components/HearingTest'));
const HearingTestInfo = React.lazy(() => import('./components/HearingTestInfo'));
const JsonCsvConverter = React.lazy(() => import('./components/JsonCsvConverter'));
const JsonCsvConverterInfo = React.lazy(() => import('./components/JsonCsvConverterInfo'));
const InvoiceGenerator = React.lazy(() => import('./components/InvoiceGenerator'));
const InvoiceGeneratorInfo = React.lazy(() => import('./components/InvoiceGeneratorInfo'));
const TextDiffChecker = React.lazy(() => import('./components/TextDiffChecker'));
const TextDiffCheckerInfo = React.lazy(() => import('./components/TextDiffCheckerInfo'));
const ImageBase64 = React.lazy(() => import('./components/ImageBase64'));
const ImageBase64Info = React.lazy(() => import('./components/ImageBase64Info'));
const Game2048 = React.lazy(() => import('./components/Game2048'));
const Game2048Info = React.lazy(() => import('./components/Game2048Info'));
const SampleFileGenerator = React.lazy(() => import('./components/SampleFileGenerator'));
const SampleFileGeneratorInfo = React.lazy(() => import('./components/SampleFileGeneratorInfo'));
const UsageHeatmap = React.lazy(() => import('./components/UsageHeatmap'));
const UsageHeatmapInfo = React.lazy(() => import('./components/UsageHeatmapInfo'));
const LegalDocGenerator = React.lazy(() => import('./components/LegalDocGenerator'));
const LegalDocGeneratorInfo = React.lazy(() => import('./components/LegalDocGeneratorInfo'));
const UtmBuilder = React.lazy(() => import('./components/UtmBuilder'));
const UtmBuilderInfo = React.lazy(() => import('./components/UtmBuilderInfo'));
const ColorPickerImage = React.lazy(() => import('./components/ColorPickerImage'));
const ColorPickerImageInfo = React.lazy(() => import('./components/ColorPickerImageInfo'));
const GradientText = React.lazy(() => import('./components/GradientText'));
const GradientTextInfo = React.lazy(() => import('./components/GradientTextInfo'));
const BoxShadowGenerator = React.lazy(() => import('./components/BoxShadowGenerator'));
const BoxShadowGeneratorInfo = React.lazy(() => import('./components/BoxShadowGeneratorInfo'));
const CssButtonGenerator = React.lazy(() => import('./components/CssButtonGenerator'));
const CssButtonGeneratorInfo = React.lazy(() => import('./components/CssButtonGeneratorInfo'));
const GlassGenerator = React.lazy(() => import('./components/GlassGenerator'));
const GlassGeneratorInfo = React.lazy(() => import('./components/GlassGeneratorInfo'));
const CssGridGenerator = React.lazy(() => import('./components/CssGridGenerator'));
const CssGridGeneratorInfo = React.lazy(() => import('./components/CssGridGeneratorInfo'));
const BezierCurve = React.lazy(() => import('./components/BezierCurve'));
const BezierCurveInfo = React.lazy(() => import('./components/BezierCurveInfo'));
const PulseGenerator = React.lazy(() => import('./components/PulseGenerator'));
const PulseGeneratorInfo = React.lazy(() => import('./components/PulseGeneratorInfo'));
const PowerCalculator = React.lazy(() => import('./components/PowerCalculator'));
const PowerCalculatorInfo = React.lazy(() => import('./components/PowerCalculatorInfo'));
const PdfSigner = React.lazy(() => import('./components/PdfSigner'));
const PdfSignerInfo = React.lazy(() => import('./components/PdfSignerInfo'));
const PdfToText = React.lazy(() => import('./components/PdfToText'));
const PdfToTextInfo = React.lazy(() => import('./components/PdfToTextInfo'));

// Other dynamic imports
const Recommendations = React.lazy(() => import('./components/Recommendations'));
const ToolFeedback = React.lazy(() => import('./components/ToolFeedback'));
const Comments = React.lazy(() => import('./components/Comments'));

export const toolsRegistry = {
  'word-counter': { Tool: WordCounter, Info: WordCounterInfo },
  'password-gen': { Tool: PasswordGenerator, Info: PasswordGeneratorInfo },
  'color-picker': { Tool: ColorPicker, Info: ColorPickerInfo },           
  'json-formatter': { Tool: JsonFormatter, Info: JsonFormatterInfo },
  'base64-encode': { Tool: Base64Tool, Info: Base64Info },
  'css-generator': { Tool: CssGenerator, Info: CssGeneratorInfo },
  'pdf-generator': { Tool: PdfGenerator, Info: PdfGeneratorInfo },
  'pdf-to-word': { Tool: PdfToWordConverter, Info: PdfToWordConverterInfo },
  'images-to-pdf': { Tool: ImagesToPdfConverter, Info: ImagesToPdfConverterInfo },
  'word-to-pdf': { Tool: WordToPdfConverter, Info: WordToPdfConverterInfo },
  'excel-to-pdf': { Tool: ExcelToPdfConverter, Info: ExcelToPdfConverterInfo },
  'pdf-to-excel': { Tool: PdfToExcelConverter, Info: PdfToExcelConverterInfo },
  'pptx-to-pdf': { Tool: PowerpointToPdfConverter, Info: PowerpointToPdfConverterInfo },
  'pdf-to-pptx': { Tool: PdfToPptConverter, Info: PdfToPptConverterInfo },
  'merge-pdf': { Tool: MergePdf, Info: MergePdfInfo },
  'pdf-to-csv': { Tool: PdfToCsvConverter, Info: PdfToCsvConverterInfo },
  'ip-lookup': { Tool: IpLookup, Info: IpLookupInfo },
  'compare-pdf': { Tool: ComparePdf, Info: ComparePdfInfo },
  'split-pdf': { Tool: SplitPdf, Info: SplitPdfInfo },
  'compress-pdf': { Tool: CompressPdf, Info: CompressPdfInfo },           
  'rotate-pdf': { Tool: RotatePdf, Info: RotatePdfInfo },
  'rearrange-pdf': { Tool: RearrangePdf, Info: RearrangePdfInfo },
  'add-pages-pdf': { Tool: AddPagesPdf, Info: AddPagesPdfInfo },
  'twitter-thread': { Tool: TwitterThread, Info: TwitterThreadInfo },
  'pdf-watermark': { Tool: PdfWatermark, Info: PdfWatermarkInfo },
  'pdf-security': { Tool: PdfSecurity, Info: PdfSecurityInfo },
  'fancy-text': { Tool: FancyTextGenerator, Info: FancyTextGeneratorInfo },
  'reddit-downloader': { Tool: RedditDownloader, Info: RedditDownloaderInfo },
  'youtube-banner': { Tool: YoutubeBannerMaker, Info: YoutubeBannerMakerInfo },
  'fuel-prices': { Tool: FuelPriceTracker, Info: FuelPriceTrackerInfo },
  'http-headers': { Tool: HttpHeadersChecker, Info: HttpHeadersCheckerInfo },
  'silver-price': { Tool: SilverPriceChecker, Info: SilverPriceCheckerInfo },
  'plagiarism-checker': { Tool: PlagiarismChecker, Info: PlagiarismCheckerInfo },
  'emi-calculator': { Tool: EmiCalculator, Info: EmiCalculatorInfo },
  'lorem-ipsum': { Tool: LoremIpsumGenerator, Info: LoremIpsumGeneratorInfo },
  'bmi-calculator': { Tool: BmiCalculator, Info: BmiCalculatorInfo },
  'password-checker': { Tool: PasswordStrengthChecker, Info: PasswordStrengthCheckerInfo },
  'world-clock': { Tool: WorldClock, Info: WorldClockInfo },
  'percentage-calculator': { Tool: PercentageCalculator, Info: PercentageCalculatorInfo },
  'age-calculator': { Tool: AgeCalculator, Info: AgeCalculatorInfo },
  'currency-converter': { Tool: CurrencyConverter, Info: CurrencyConverterInfo },
  'barcode-generator': { Tool: BarcodeGenerator, Info: BarcodeGeneratorInfo },
  'gold-price': { Tool: GoldPriceChecker, Info: GoldPriceCheckerInfo },
  'emoji-mixer': { Tool: EmojiMixer, Info: EmojiMixerInfo },             
  'media-enhancer': { Tool: MediaEnhancer, Info: MediaEnhancerInfo },
  'image-to-text': { Tool: ImageToText, Info: ImageToTextInfo },
  'image-describer': { Tool: ImageDescriber, Info: ImageDescriberInfo },  
  'palette-generator': { Tool: PaletteGenerator, Info: PaletteGeneratorInfo },
  'markdown-previewer': { Tool: MarkdownPreviewer, Info: MarkdownPreviewerInfo },                                                                 
  'qr-generator': { Tool: QrGenerator, Info: QrGeneratorInfo },
  'case-converter': { Tool: CaseConverter, Info: CaseConverterInfo },
  'image-converter': { Tool: ImageConverter, Info: ImageConverterInfo },
  'image-resizer': { Tool: ImageResizer, Info: ImageResizerInfo },
  'image-compressor': { Tool: ImageCompressor, Info: ImageCompressorInfo },
  'gif-maker': { Tool: GifMaker, Info: GifMakerInfo },
  'image-cropper': { Tool: ImageCropper, Info: ImageCropperInfo },
  'background-remover': { Tool: BackgroundRemover, Info: BackgroundRemoverInfo },
  'image-rotator': { Tool: ImageRotator, Info: ImageRotatorInfo },
  'watermark-adder': { Tool: WatermarkAdder, Info: WatermarkAdderInfo },  
  'brightness-adjuster': { Tool: BrightnessAdjuster, Info: BrightnessAdjusterInfo },                                                             
  'metadata-viewer': { Tool: MetadataViewer, Info: MetadataViewerInfo },
  'scientific-calculator': { Tool: ScientificCalculator, Info: ScientificCalculatorInfo },
  'image-blur': { Tool: ImageBlur, Info: ImageBlurInfo },
  'uuid-generator': { Tool: UuidGenerator, Info: UuidGeneratorInfo },     
  'pdf-to-text': { Tool: PdfToText, Info: PdfToTextInfo },
  'speech-tool': { Tool: SpeechTool, Info: SpeechToolInfo },
  'image-sharpener': { Tool: ImageSharpener, Info: ImageSharpenerInfo },
  'icon-converter': { Tool: IconConverter, Info: IconConverterInfo },
  'photo-collage-maker': { Tool: PhotoCollageMaker, Info: PhotoCollageMakerInfo },
  'pomodoro-timer': { Tool: PomodoroTimer, Info: PomodoroTimerInfo },
  'social-resizer': { Tool: SocialMediaResizer, Info: SocialMediaResizerInfo },
  'youtube-thumbnail': { Tool: YoutubeThumbnail, Info: YoutubeThumbnailInfo },
  'instagram-downloader': { Tool: InstagramDownloader, Info: InstagramDownloaderInfo },
  'twitter-downloader': { Tool: TwitterVideoDownloader, Info: TwitterVideoDownloaderInfo },
  'facebook-downloader': { Tool: FacebookVideoDownloader, Info: FacebookVideoDownloaderInfo },
  'tiktok-downloader': { Tool: TikTokVideoDownloader, Info: TikTokVideoDownloaderInfo },
  'youtube-tags-extractor': { Tool: YoutubeTagsExtractor, Info: YoutubeTagsExtractorInfo },                                                       
  'image-to-jpg': { Tool: ImageToJpgConverter, Info: ImageToJpgConverterInfo },
  'hashtag-generator': { Tool: HashtagGenerator, Info: HashtagGeneratorInfo },
  'emoji-keyboard': { Tool: EmojiKeyboard, Info: EmojiKeyboardInfo },
  'twitter-counter': { Tool: TwitterCounter, Info: TwitterCounterInfo },
  'ig-story-maker': { Tool: IgStoryMaker, Info: IgStoryMakerInfo },
  'fb-cover-resizer': { Tool: FbCoverResizer, Info: FbCoverResizerInfo },
  'li-scheduler': { Tool: LinkedInScheduler, Info: LinkedInSchedulerInfo },
  'social-post-generator': { Tool: SocialMediaPostGenerator, Info: SocialMediaPostGeneratorInfo },
  'tool-comparison': { Tool: ToolComparison, Info: ToolComparisonInfo },
  'pinterest-downloader': { Tool: PinterestDownloader, Info: PinterestDownloaderInfo },
  'social-analytics': { Tool: SocialAnalytics, Info: SocialAnalyticsInfo },
  'youtube-downloader': { Tool: YoutubeDownloader, Info: YoutubeDownloaderInfo },
  'dailymotion-downloader': { Tool: DailymotionDownloader, Info: DailymotionDownloaderInfo },
  'cricket-scores': { Tool: CricketScores, Info: CricketScoresInfo },
  'api-response-viewer': { Tool: ApiResponseViewer, Info: ApiResponseViewerInfo },
  'text-to-handwriting': { Tool: TextToHandwriting, Info: TextToHandwritingInfo },
  'fake-data-generator': { Tool: FakeDataGenerator, Info: FakeDataGeneratorInfo },
  'hash-generator': { Tool: HashGenerator, Info: HashGeneratorInfo },
  'meta-tag-generator': { Tool: MetaTagGenerator, Info: MetaTagGeneratorInfo },
  'wifi-qr-generator': { Tool: WifiQrGenerator, Info: WifiQrGeneratorInfo },
  'contrast-checker': { Tool: ContrastChecker, Info: ContrastCheckerInfo },
  'exif-remover': { Tool: ExifRemover, Info: ExifRemoverInfo },
  'regex-tester': { Tool: RegexTester, Info: RegexTesterInfo },
  'color-palette-extractor': { Tool: ColorPaletteExtractor, Info: ColorPaletteExtractorInfo },
  'hearing-test': { Tool: HearingTest, Info: HearingTestInfo },
  'json-csv-converter': { Tool: JsonCsvConverter, Info: JsonCsvConverterInfo },
  'invoice-generator': { Tool: InvoiceGenerator, Info: InvoiceGeneratorInfo },
  'text-diff-checker': { Tool: TextDiffChecker, Info: TextDiffCheckerInfo },
  'image-base64': { Tool: ImageBase64, Info: ImageBase64Info },
  '2048-game': { Tool: Game2048, Info: Game2048Info },
  'sample-file-generator': { Tool: SampleFileGenerator, Info: SampleFileGeneratorInfo },  
  'usage-heatmap': { Tool: UsageHeatmap, Info: UsageHeatmapInfo },
  'legal-doc-generator': { Tool: LegalDocGenerator, Info: LegalDocGeneratorInfo },
  'utm-builder': { Tool: UtmBuilder, Info: UtmBuilderInfo },
  'image-color-picker': { Tool: ColorPickerImage, Info: ColorPickerImageInfo },
  'gradient-text': { Tool: GradientText, Info: GradientTextInfo },
  'box-shadow-generator': { Tool: BoxShadowGenerator, Info: BoxShadowGeneratorInfo },
  'css-button-generator': { Tool: CssButtonGenerator, Info: CssButtonGeneratorInfo },
  'glass-generator': { Tool: GlassGenerator, Info: GlassGeneratorInfo },
  'css-grid-generator': { Tool: CssGridGenerator, Info: CssGridGeneratorInfo },
  'bezier-curve': { Tool: BezierCurve, Info: BezierCurveInfo },
  'pulse-generator': { Tool: PulseGenerator, Info: PulseGeneratorInfo },
  'power-calculator': { Tool: PowerCalculator, Info: PowerCalculatorInfo },
  'pdf-signer': { Tool: PdfSigner, Info: PdfSignerInfo },

  // Wrapper components
  Recommendations, ToolFeedback, Comments                               
};
