package main;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.imageio.ImageIO;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.rendering.PDFRenderer;

import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.canvas.parser.EventType;
import com.itextpdf.kernel.pdf.canvas.parser.PdfTextExtractor;
import com.itextpdf.kernel.pdf.canvas.parser.data.IEventData;
import com.itextpdf.kernel.pdf.canvas.parser.data.TextRenderInfo;
import com.itextpdf.kernel.pdf.canvas.parser.listener.ITextExtractionStrategy;
import com.itextpdf.kernel.pdf.canvas.parser.listener.SimpleTextExtractionStrategy;

public class QuestionExtractor {
	static int left = (int) PDRectangle.A4.getLowerLeftX();
	static int right = (int) PDRectangle.A4.getUpperRightX();
    
	static int top = (int) PDRectangle.A4.getUpperRightY();
	static int bottom = (int) PDRectangle.A4.getLowerLeftY();
	
	static int buffer = 30;

    public static void main(String[] args) throws IOException {
    	String filePathQuestions = "src/main/resources/questions/";
    	String filePathAnswers = "src/main/resources/answers/";
    	File questionsFolder = new File(filePathQuestions);
    	File answersFolder = new File(filePathAnswers);
    	
    	int i = 0;
    	
    	for(File file : questionsFolder.listFiles()) {
    		processQuestionsPDF(filePathQuestions + file.getName(), i);
    		i++;
    	}
    	
    	i = 0;
    	
    	for(File file : answersFolder.listFiles()) {
    		processAnswersPDF(filePathAnswers + file.getName(), i);
    		i++;
    	}
    }
    
    public static void processAnswersPDF(String filePath, int id) throws IOException {
    	PdfReader reader = new PdfReader(filePath);
        PdfDocument pdfDocument = new PdfDocument(reader);

        int fileCounter = 1;

        for (int i = 1; i <= pdfDocument.getNumberOfPages(); i++) {
            String text = PdfTextExtractor.getTextFromPage(pdfDocument.getPage(i));
            text = text.replace("\u221A", "sqrt");
            
            int lastIndex = 0;
            int lastEqualsIndex = -1;

            while(true) {
                int questionIndex = text.indexOf("Question", lastIndex);
                int equalsIndex = text.lastIndexOf("=", (questionIndex != -1) ? questionIndex : text.length());

                if (equalsIndex != -1 && equalsIndex != lastEqualsIndex) {
                    String extractedText = (questionIndex != -1) ? text.substring(equalsIndex + 1, questionIndex).trim() : text.substring(equalsIndex + 1).trim();
                    System.out.println(text);
                    int newlineIndex = extractedText.indexOf("\n");
                    if (newlineIndex != -1) {
                    	//Only first line
                        //extractedText = extractedText.substring(0, newlineIndex);
                    }

                    String outputFilePath = "answers/" + "answer" + fileCounter + ".txt";
                    try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFilePath))) {
                        writer.write(extractedText);
                    }
                    fileCounter++;
                    lastEqualsIndex = equalsIndex;
                }

                if (questionIndex == -1) {
                    break;
                }

                lastIndex = questionIndex + "Question".length();
            }
        }

        pdfDocument.close();
    }
    
    public static void processQuestionsPDF(String filePath, int id) throws IOException {
    	String aPattern = "\\(a\\)";
    	String pattern = "\\(a\\)|\\(b\\)|\\(c\\)|\\(d\\)|\\(e\\)|\\(f\\)|\\(g\\)";
        String endPattern = "continues on page |End of Question |End of paper";
        String excludePattern = "\\(i\\)|\\(ii\\)|\\(iii\\)|\\(iv\\)|\\(v\\)|Prove|prove|Show|show|Explain|explain|Sketch|sketch|Draw|draw|Plot|plot|Indicate|indicate";
        
        PdfReader reader = new PdfReader(filePath);
        PdfDocument pdfDocument = new PdfDocument(reader);

        int aCount = 0;
        for(int i = 1; i <= pdfDocument.getNumberOfPages(); i++) {
        	TextExtractionStrategy aStrategy = new TextExtractionStrategy(aPattern);
        	TextExtractionStrategy strategy = new TextExtractionStrategy(pattern);
        	TextExtractionStrategy endStrategy = new TextExtractionStrategy(endPattern);
        	TextExtractionStrategy excludeStrategy = new TextExtractionStrategy(excludePattern);
        	
        	PdfTextExtractor.getTextFromPage(pdfDocument.getPage(i), aStrategy);
        	PdfTextExtractor.getTextFromPage(pdfDocument.getPage(i), strategy);
        	PdfTextExtractor.getTextFromPage(pdfDocument.getPage(i), endStrategy);
        	PdfTextExtractor.getTextFromPage(pdfDocument.getPage(i), excludeStrategy);
            
            List<Integer> yPositions = new ArrayList<Integer>();
            List<Integer> excludeYPositions = new ArrayList<Integer>();
            
            for(Rectangle rect : strategy.getCoordinates()) {
                yPositions.add((int) rect.getY() + buffer);
            }
            
            for(Rectangle rect : excludeStrategy.getCoordinates()) {
            	excludeYPositions.add((int) rect.getY());
            }
            
            if(endStrategy.getCoordinates().size() > 0) {
            	yPositions.add((int) endStrategy.getCoordinates().get(0).getY() + buffer);
            }
            else {
            	yPositions.add(bottom);
            }
            
            if(aStrategy.getCoordinates().size() > 0) {
            	aCount++;
            }
            
            System.out.println(i + ": ");
            for(int j = 0; j < yPositions.size(); j++) System.out.print(yPositions.get(j) + ", ");
            System.out.println();
            
            for(int j = 0; j < yPositions.size() - 1; j++) {
            	boolean exclude = false;
            	
            	for(int y : excludeYPositions) {
            		if(yPositions.get(j) >= y && y >= yPositions.get(j + 1)) {
            			exclude = true;
            			break;
            		}
            	}
            	
            	if(exclude) continue;
            	saveSnippet(filePath, left, yPositions.get(j), right, yPositions.get(j + 1), i - 1, "images/image" + id + "-" + (aCount + 10) + "-" + j + ".png");
            }
        }

        pdfDocument.close();
    }
    
    public static void saveSnippet(String pdfPath, int x1, int y1, int x2, int y2, int pageNumber, String imagePath) {
        try(PDDocument document = PDDocument.load(new File(pdfPath))) {
            PDFRenderer pdfRenderer = new PDFRenderer(document);
            int defaultDPI = 72;
            int newDPI = defaultDPI * 5;
            int ratio = newDPI / defaultDPI;
            BufferedImage bim = pdfRenderer.renderImageWithDPI(pageNumber, newDPI);
            System.out.println((top - y1) + " " + (y1 - y2));
            BufferedImage snippet = bim.getSubimage(x1 * ratio, (top - y1) * ratio, (x2 - x1) * ratio, (y1 - y2) * ratio);
            ImageIO.write(snippet, "PNG", new File(imagePath));
        } 
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static class TextExtractionStrategy implements ITextExtractionStrategy {
        private final List<Rectangle> coordinates = new ArrayList<Rectangle>();
        private final Pattern pattern;

        public TextExtractionStrategy(String pattern) {
            this.pattern = Pattern.compile(pattern);
        }

        public void eventOccurred(IEventData data, EventType type) {
            if (data instanceof TextRenderInfo) {
                TextRenderInfo textRenderInfo = (TextRenderInfo) data;
                String text = textRenderInfo.getText();
                Matcher matcher = pattern.matcher(text);
                if (matcher.find()) {
                    Rectangle rect = new Rectangle(
                            textRenderInfo.getBaseline().getStartPoint().get(0),
                            textRenderInfo.getBaseline().getStartPoint().get(1),
                            textRenderInfo.getBaseline().getEndPoint().get(0) - textRenderInfo.getBaseline().getStartPoint().get(0),
                            textRenderInfo.getAscentLine().getEndPoint().get(1) - textRenderInfo.getBaseline().getStartPoint().get(1)
                    );
                    coordinates.add(rect);
                }
            }
        }

        public List<Rectangle> getCoordinates() {
            return coordinates;
        }

		public Set<EventType> getSupportedEvents() {
			return null;
		}

		public String getResultantText() {
			return null;
		}
    }
}