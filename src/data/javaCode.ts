export interface JavaCodeVariant {
  id: string;
  title: string;
  filename: string;
  description: string;
  code: string;
  highlightedLines?: number[];
}

export const JAVA_VARIANTS: JavaCodeVariant[] = [
  {
    id: 'standard',
    title: 'Standart Çözüm (Önerilen)',
    filename: 'Main.java',
    description: 'İlk girilen sayıyı min ve max referansı olarak alan, en güvenilir ve bellek dostu O(1) alan karmaşıklığına sahip yöntem.',
    code: `/**
 * Program: N Tane Sayıdan En Büyük ve En Küçük Sayıyı Bulma
 * Yazar / İmza: Enes Öztürk
 * Açıklama: Klavyeden girilen N adet sayı içerisinden en büyük ve
 *           en küçük değerleri bularak ekrana yazdırır.
 */
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Klavyeden girdi almak için Scanner nesnesi oluşturuyoruz
        Scanner scanner = new Scanner(System.in);

        // Kullanıcıdan kaç adet sayı gireceğini alıyoruz
        System.out.print("Kaç tane sayı gireceksiniz: ");
        int n = scanner.nextInt();

        // Sayı adedinin geçerli olup olmadığını kontrol ediyoruz
        if (n <= 0) {
            System.out.println("Lütfen en az 1 veya daha büyük bir sayı giriniz.");
            scanner.close();
            return;
        }

        // İlk sayıyı alıyoruz ve başlangıçta hem en küçük hem en büyük kabul ediyoruz
        System.out.print("1. Sayıyı giriniz: ");
        int ilkSayi = scanner.nextInt();
        int enBuyuk = ilkSayi;
        int enKucuk = ilkSayi;

        // Kalan (n - 1) adet sayıyı döngü ile alıp kıyaslıyoruz
        for (int i = 2; i <= n; i++) {
            System.out.print(i + ". Sayıyı giriniz: ");
            int sayi = scanner.nextInt();

            // Eğer girilen sayı mevcut en büyükten büyükse güncelle
            if (sayi > enBuyuk) {
                enBuyuk = sayi;
            }

            // Eğer girilen sayı mevcut en küçükten küçükse güncelle
            if (sayi < enKucuk) {
                enKucuk = sayi;
            }
        }

        // Sonuçları ekrana yazdırma
        System.out.println("En büyük sayı: " + enBuyuk);
        System.out.println("En küçük sayı: " + enKucuk);

        // İmza
        System.out.println("\\n------------------------------");
        System.out.println("Programcı: Enes Öztürk");

        // Kaynak sızıntısını önlemek için scanner'ı kapatıyoruz
        scanner.close();
    }
}`
  },
  {
    id: 'limits',
    title: 'Integer Sınır Değerleri Çözümü',
    filename: 'MinMaxLimits.java',
    description: 'Integer.MIN_VALUE ve Integer.MAX_VALUE sabitleri ile değişkenleri başlatıp tek bir döngüde tüm N sayıları alan yöntem.',
    code: `/**
 * Program: Sınır Değerleri ile Min-Max Bulma
 * Yazar / İmza: Enes Öztürk
 */
import java.util.Scanner;

public class MinMaxLimits {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Kaç tane sayı gireceksiniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Geçersiz sayı adedi!");
            scanner.close();
            return;
        }

        // En küçük olası tam sayı ve en büyük olası tam sayı başlangıcı
        int enBuyuk = Integer.MIN_VALUE; // -2147483648
        int enKucuk = Integer.MAX_VALUE; //  2147483647

        for (int i = 1; i <= n; i++) {
            System.out.print(i + ". Sayıyı giriniz: ");
            int sayi = scanner.nextInt();

            if (sayi > enBuyuk) {
                enBuyuk = sayi;
            }
            if (sayi < enKucuk) {
                enKucuk = sayi;
            }
        }

        System.out.println("En büyük sayı: " + enBuyuk);
        System.out.println("En küçük sayı: " + enKucuk);
        System.out.println("\\nProgramcı: Enes Öztürk");

        scanner.close();
    }
}`
  },
  {
    id: 'streams',
    title: 'Modern Java Stream & Array Çözümü',
    filename: 'MinMaxStream.java',
    description: 'Girilen sayıları bir diziye (int[]) kaydedip Java 8+ Arrays.stream() fonksiyonel metotları ile çözümleme.',
    code: `/**
 * Program: Java 8+ Stream API ile Min & Max
 * Yazar / İmza: Enes Öztürk
 */
import java.util.Arrays;
import java.util.Scanner;

public class MinMaxStream {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Kaç tane sayı gireceksiniz: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Lütfen pozitif bir adet giriniz.");
            scanner.close();
            return;
        }

        int[] sayilar = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.print((i + 1) + ". Sayıyı giriniz: ");
            sayilar[i] = scanner.nextInt();
        }

        // Stream API kullanarak en büyük ve en küçük değerleri bulma
        int enBuyuk = Arrays.stream(sayilar).max().getAsInt();
        int enKucuk = Arrays.stream(sayilar).min().getAsInt();

        System.out.println("En büyük sayı: " + enBuyuk);
        System.out.println("En küçük sayı: " + enKucuk);
        System.out.println("\\nProgramcı: Enes Öztürk");

        scanner.close();
    }
}`
  }
];

export interface StepRecord {
  step: number;
  input: number;
  previousMin: number | null;
  previousMax: number | null;
  newMin: number;
  newMax: number;
  minChanged: boolean;
  maxChanged: boolean;
  explanation: string;
}

export const SAMPLE_SCENARIO = {
  n: 4,
  numbers: [16, -22, -15, 100],
  expectedMax: 100,
  expectedMin: -22,
};
