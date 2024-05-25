package main;

import java.io.File;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

public class OCR {
	public static String ocr() {
		File imageFile = new File("images/image1-11-1.png");
        ITesseract instance = new Tesseract();
        
        instance.setDatapath("C:/ProgramData/Microsoft/Windows/Start Menu/Programs/Tesseract-OCR");
        instance.setLanguage("eng+equ"); // Use English and math equation recognition

        try {
            String result = instance.doOCR(imageFile);
            System.out.println(result);
            return result;
        } 
        catch(TesseractException e) {
            System.err.println(e.getMessage());
        }
        
        return "";
	}
}
